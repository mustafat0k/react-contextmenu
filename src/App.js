import React, {useEffect, useState, useCallback} from 'react'
 import { FiArrowRight, FiPlusCircle, FiSearch, FiSettings, FiStar } from 'react-icons/fi';
import { ReactContextMenu, useSelector } from './ContextMenu';
 
const menu = [
    {title:'Add new', icon:<FiPlusCircle size={25} /> },
    {title:'Go', },
] 

function App(props) {

  const useAction = ({ slug, menu, item, opts }) => {
    console.log('useAction:',slug, menu, item, opts)

    switch (slug) {
      case 'add-new':
        return item.title;
        break;
      case 'go':
          return 'Gooo';
      break;
      default:
        return menu.title;
        break;
    }
    return;
  }

  const useIcon = ({ slug, icon, item }) => {
    console.log('useIcon:',slug, item)
    switch (slug) {
      case 'go':
        return true ? <FiStar className='fill-gray-300' size={25} /> : icon;
        break;
      default:
        return icon;
        break;
    }
    return;
  }
  const useEvent = ({ slug, menu, item }) => {
    console.log('useEvent',slug, menu,item)


    switch (slug) {
      case 'go':
        alert('go')
        return;
      break;
      default:
        return;
      break;
    }
    return;
  }

  return (
    <ReactContextMenu
      name="general"
      menu={menu}
      template={{}}
      useAction={useAction}
      useIcon={useIcon}
      useEvent={useEvent}
      options={{cyclic:false}}
      theme="default"
      mode="dark"
      rtl="false"
      attributes={{
        id:'go'
      }}
    >
      <div className="grid grid-cols-12 h-screen w-screen p-5">
        <div className="bg-gray-200 col-span-4 rounded-md">
        
            {[{title:'test1'},{title:'test1'},{title:'test3'}].map(item=>(
              <ReactContextMenu
              name="general"
              menu={menu}
              template={{}}
              useAction={useAction}
              useIcon={useIcon}
              useEvent={useEvent}
              options={{cyclic:false}}
              theme="default"
              mode="dark"
              rtl="false"
              attributes={{
                id:item.title,
                title:item.title
              }}
            >
              <div  >{item.title}</div>
          </ReactContextMenu> 
            ))}
        </div>
      </div>
    </ReactContextMenu> 
  );
}

export default App;

let Templates = {}
Templates.Default = {}
Templates.Edge = {}