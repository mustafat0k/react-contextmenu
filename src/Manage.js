import React, {useEffect, useState, useCallback} from 'react'
 import { 
  FiArrowRight, FiChevronRight, FiEdit, FiHeart, FiStar,
  FiBarChart, FiEdit3, FiInbox, FiMinusCircle, FiMove, FiPlusCircle, FiSearch, FiSettings, FiShield, FiTerminal, FiTrash2, FiUsers } from 'react-icons/fi';
import { ReactContextMenu, useSelector } from './ContextMenu';
 
const customFolder = [
    {title:'Rename', icon:<FiEdit size={25} />},
    {title:'New Folder', icon:<FiPlusCircle size={25} />},
    {title:'Edit', icon:<FiEdit size={25} />},
    {title:'Emoji', icon:'🎉', ecluded:true },
    {title:'Share',  ecluded:true },
    {title:'Fav', icon:<FiHeart size={25} />},
    {title:'Other', children:[
        {title:'Remove', icon:<FiTrash2 size={25} /> },
        {title:'Exclude', icon:<FiMinusCircle size={25} /> },
        {title:'Dim', icon:<FiMinusCircle size={25} /> },
        {title:'Hide', icon:<FiMinusCircle size={25} /> },
    ] },
]

const customFile = [
    {title:'Go' },
    {title:'Edit', icon:<FiEdit size={25} />},
    {title:'Move', icon:<FiMove size={25} />},
    {title:'line'},
    {title:'Comments', icon:<FiUsers size={25} />},
    {title:'Share',  },
]

const customOutside = [
    {title:'Add new', icon:<FiPlusCircle size={25} /> },
    {title:'Settings', icon:<FiSettings size={25} />},
    {title:'Search', icon:<FiSearch size={25} />},
    {title:'line',  },
    {title:'Customization',  },
    {title:'Collections',  },
] 

function App(props) {
  const { selected } = useSelector(state => state);

  const useAction = ({ slug, menu, item, opts }) => {
    switch (slug) {
      case 'go':
        return opts?.len ? (
          <div className='justify-between items-center w-full'>
            <div className='flex items-center'>
              <img src={item.icon} width='15' className='mr-2' />
              {menu.title}
            </div>
            <FiArrowRight />
          </div>
        ) : (
          <div className=' w-full'>
            {menu.title} to <b>{selected.length}</b> items
          </div>
        )
        break;
      case 'share':
        return item.shared ? 'Unshare' : menu.title;
      case 'fav':
        return item.faved ? 'Unfav' : menu.title;
        break;
      case '':
        return;
        break;
      default:
        return menu.title;
        break;
    }
    return;
  }

  const useEvent = ({ slug, menu, item }) => {

    switch (slug) {
      case 'rename':
        //  update({ id: item.id, folders, setFolders, item: { edit: true } })
        return;
        break;
      case 'new-folder':
        // newFolder({ id: item.id, folders, setFolders })
        return;
        break;
      case 'edit':
        //  item.type == 'folder' && open({ type: 'edit-folder', styles: { padding: 0, height: 'fit-content' }, values: { id: item.id } })
        //  item.type == 'file' && open({ type: 'edit-file', styles: { padding: 0, height: 'fit-content', overflow: 'unset' }, values: { id: item.id } })
        return;
        break;
      case 'emoji':
        //  open({ type: 'emoji', styles: { padding: 0, height: 'fit-content' }, values: { id: item.id } })
        return;
        break;
      case 'share':
        if (item.shared)
          takeAction(item.id, { meta: { shared: false } })
        else
          takeAction(item.id, { meta: { shared: true } })

        return;
        break;
      case 'fav':
        if (item.faved)
          takeAction(item.id, { meta: { faved: false } })
        else
          takeAction(item.id, { meta: { faved: true } })
        return;
      case 'comments':
        // openDrawer({ type: 'comments', size: 550, styles: {}, values: { id: item.id } })
        return;
      case 'settings':
        //  open({ type: 'customization', styles: {}, values: { id: item.id } })
        return;
      case 'advanced-search':
        //  open({ type: 'search', styles: {}, values: { id: item.id } })
        return;
        break;
      default:
        return;
        break;
    }
  }
  const takeAction = (id, item) => {
    // update({ id, folders, setFolders, item })
  }

  return (
    <React.Fragment>
       <ReactContextMenu
         name="outside"
         menu={customOutside}
         useAction={useAction}
         useEvent={useEvent}
         theme="default"
         mode="dark"
         rtl="false"
       >
      <div className="grid grid-cols-12 h-screen w-screen p-5">
        <div className="bg-gray-200 col-span-4 rounded-md">
         <ReactContextMenu 
             name="folder"
             menu={customFolder}
             useAction={useAction}
             useEvent={useEvent}
         >
          <ul>
            {Array.from(Array(5)).map((item, key)=>(
              <li 
              key={'test'+key} className="p-2 bg-gray-300 m-2 cursor-pointer hover:bg-gray-400">  Test {++key} </li>
            ))}
          </ul>
        </ReactContextMenu> 
        </div>
        <div className="col-span-8">
        {()=>{
          <React.Fragment>  

          test

          </React.Fragment>
        }}
         <ReactContextMenu 
            name="file"
           menu={customFile}
           useAction={useAction}
           useEvent={useEvent}
         >
           <div className="grid grid-cols-4 gap-2 m-2">
                {Array.from(Array(8)).map((item, key)=> (
<div    
                      data-id={key}
                      data-count={5}
                      key={'item'+key} className="bg-gray-300 h-20 flex items-center justify-center cursor-pointer" >Item {key}</div>
                ))}
            </div>
        </ReactContextMenu> 

        </div>
      </div>

        </ReactContextMenu> 
    </React.Fragment>
  );
}

export default App;
