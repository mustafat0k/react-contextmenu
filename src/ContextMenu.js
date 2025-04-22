import React, {useEffect, useState, useCallback} from 'react'
 import { 
  FiArrowRight, FiChevronRight, FiEdit, FiHeart, FiStar,
  FiBarChart, FiEdit3, FiInbox, FiMinusCircle, FiMove, FiPlusCircle, FiSearch, FiSettings, FiShield, FiTerminal, FiTrash2, FiUsers } from 'react-icons/fi';
import clx from 'classnames'
import logo from './logo.svg';
import {create} from 'zustand'
import slug from 'slug'
import PropTypes from 'prop-types';
// title, icon, value, offTitle, offIcon

export const ReactContextMenu = ({ children, name, menu, useAction, useEvent, useIcon, attributes }) => {

    return (
      <div className='dark' 

        id={slugify(name)}
       >
        <ContextMenu 
          name={name}
          menu={menu}
          useIcon={useIcon}
          useAction={useAction}
          takeEvent={useEvent}
          content={()=>{}}
          attributes={attributes}
        />
        {children}
      </div>
    )
  }
  
  const ContextMenu = ({ Component, name, menu, useAction, useIcon, takeEvent, attributes }) => {
    const { xPos, yPos, showMenu, setShowMenu, item } = useContextMenu({name:slugify(name), attributes });
    return (
      <div
        className="menu-container bg-white dark:bg-gray-9 
        dark:border-gray-6 rounded-lg overflow-hidden w-40- w-[250px] h-fit 
        z-[999] absolute shadow-md border border-gray-200"
        onClickCapture={() => setShowMenu(!showMenu)}

        style={{
          top: yPos,
          left: xPos,
          opacity: showMenu ? 1 : 0,
          display: showMenu ? '' : 'none'
        }}>
        <CustomMenu 
          item={item} 
          menu={menu} 
          name={name} 
          useIcon={useIcon} 
          useAction={useAction} 
          takeEvent={takeEvent}
          
         /> 
        {showMenu ? (
          <div>
            {/** 
            {item.id}
            {item.faved}
            {item.type}
            {item.mode}
            **/}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  
 export const CustomMenu = ({ name, item, menu, useAction, useIcon, takeEvent }) => {
    // const { folders, setFolders } = useFolder(state => state)
    // const { open } = useModal(state => state)
    // const openDrawer = useDrawer(state => state.open)
  

  
    const Line = () => <li className='flex items-center my-1- h-[1px] bg-gray-100'></li>
  
    const Button = ({ menu }) => {
        const slug = slugify(menu.title);
   
        return (
          <li
           onClickCapture={()=>takeEvent({ slug, menu, item })} 
            className='dark:bg-black dark:text-white flex justify-between items-center px-2 py-1 cursor-pointer w-full hover:bg-gray-100 
            dark:hover:bg-gray-7'>
  
            <div className='flex items-center'>
              {useIcon({ slug, icon: menu.icon, item })}
              <p className={clx(`mx-1 flex items-center w-full`,
                { 'opacity-[.4]': slug == 'emoji' }
              )}>
  
                {useAction({ slug, menu, item })}
  
              </p>
            </div>
  
            <div className='hidden flex items-center cursor-pointer'>
              <div className='bg-gray-50 rounded-md text-xs text-gray-500 p-1 px-2
                  border border-0 border-b-2 border-r-2 cursor-poitner mr-2'>CTRL</div>
              <div className='bg-gray-50 rounded-md text-xs text-gray-500 p-1 px-2
                  border border-0 border-b-2 border-r-2 cursor-poitner'>K</div>
            </div>
  
          </li>
        )
    }
  
    return (
      <ul className=''>
  
         
        {menu.map((m, key) => (
          m.title != 'line' ?  <React.Fragment key={name+'-'+key}> <Button menu={m} />  </React.Fragment> : <Line />
        ))}
  
        {/** 
  
        {!item.type && customOutside.map((menu, key) => (
          menu.title != 'line' ?  <React.Fragment key={'outside-'+key}> <Button menu={menu} />  </React.Fragment> : <Line />
        ))}
  
        {item.type == 'folder' && customFolder.map(menu => (
          menu.title != 'line' ? <React.Fragment> <Button menu={menu} />  </React.Fragment> : <Line />
  
        ))}
        {item.type == 'file' && customFile.map(menu => (
          menu.title != 'line' ?  <React.Fragment> <Button menu={menu} />  </React.Fragment> : <Line />
  
        ))}
  
        **/}
  
  
      </ul>
    );
  }




  
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }
  
  export const useContextMenu = ({name, menu, attributes}) => {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, setShowMenu] = useState(false);
    const [item, setItem] = useState({});
    const { height, width } = useWindowDimensions();
  
    const handleContextMenu = useCallback(
      (e) => {
        e.preventDefault();
        // let menuId = document.getElementById(name)
        const target = e.target.closest(`#${name}`);
        const id = target?.getAttribute('id');
          
          let obj = {...attributes};
          let nodes=[], values=[];
          try{
   let attributes = target?.attributes  
          if(attributes){
            for (let attr, i = 0, attributes, n = attributes.length; i < n; i++){
                attr = attributes[i];
                obj[attr.nodeName] = attr.nodeValue;
                nodes.push(attr.nodeName);
                values.push(attr.nodeValue);
            }
          }
          }catch(err){
           // console.log(err.message, err)
          }
          
          console.log('obj:', obj)
        // const title = target?.getAttribute('title');
        // const faved = target?.getAttribute('faved');
        // const shared = target?.getAttribute('shared');
        // const type = target?.getAttribute('type');
        // const icon = target?.getAttribute('icon');
        // const mode = target?.getAttribute('mode');
        setItem({ id, ...obj }); // type, mode, title, icon, faved, shared 
          console.log('item:', item)
  
        // const height = screen.height
        const width = document.body.clientWidth
        const distanceX = width - e.pageX
        const distanceY = height - e.pageY
        const w =  200; // 200
        const h =  200; // 200
  
        console.log(distanceX, distanceY)
  
        setXPos(`${e.pageX}px`);
        setYPos(`${e.pageY}px`);
        if (distanceX < w) {
          setXPos(`${width - w}px`);
        }
         if (distanceY < h) {
          setYPos(`${height - h}px`);
        }
        setShowMenu(true);
      },
      [setXPos, setYPos]
    );
  
    const handleClick = useCallback(() => {
      showMenu && setShowMenu(false);
    }, [showMenu]);
  
    useEffect(() => {
      document.getElementById(name).addEventListener("click", handleClick);
      document.getElementById(name).addEventListener("contextmenu", handleContextMenu);
      return () => {
        document.getElementById(name).addEventListener("click", handleClick);
        document.getElementById(name).removeEventListener("contextmenu", handleContextMenu);
      };
    });
  
    useEffect(() => {
      document.getElementById(name).addEventListener("scroll", handleClick);
    });
  
    return { xPos, yPos, showMenu, setShowMenu, item };
  };
  
  export const useSelector = create((set, get) => ({
      selected: [],
      update: () => set((state, action) => ({ selected: action  })),
      create: () => set((state, action) => ({ selected: [action, state.selected]  })),
      toggle: async (item) => {
          const list = new Reorder(get().selected)
          list.toggle(item);  
          set({selected: list.get() })
      },
      add: async (item) => set({selected: [...get().selected||[], item ]}),
      change: async (selected) => set({selected}), 
      select: async (props) => { 
          const list = new Reorder(get().selected)
          list.select(props);  
          set({selected: list.get() })
      },
      clear: () => set({ selected: [] }),
      removeMany: () => set({ selected: [] }),
      createMany: () => set({ selected: [] }),
  }))
  
  export class Reduce {
      constructor({folders, selected, pro}) {
          this.folders = [...folders];
          this.selected = selected;
      }
      get = () => {return this.folders};    
      set = (folders) => {this.folders = folders};
      add = (folder) => {this.folders = [folder, ...this.folders]};
      create = () => {};
      update = () => {};
      remove = (id) => {
          return this.folders = this.folders.filter(f=>f._id!=id)
      };
      rename  = () => {};
      clear  = () => {return this.folders = []};
  }
  
  export class Reorder {
      constructor(files, selected) {
          this.selected = selected;
          this.files = files;
          this.selected = selected;
      }
      get = () => this.files;    
      set = (files) => {this.files = files};
      add = (file) => this.files = [...this.files, file];
  
      toggle = (item) => {
          if(!this.files) return;
          const isHave = this.files.find(f=>f._id===item._id)
          if(isHave)
              return this.files = this.files.filter(f=>f._id!=item._id)
          else 
              return this.files = [...this.files, item]
      };
      update = () => {};
      remove = () => {};
      rename = () => {};
      clear  = () => {return this.files = []};
      // selected
      isSelected = (item) => {
          const isHave = this.selected?.find(f=>f._id===item._id)
          return isHave;
      }
      getSelected = () => this.selected || [];    
      setSelected = (action) => {return action && (this.selected=[...action])};    
      addSelected = (action) => {
          if(!action) return;
          this.selected = [...this.selected, action]
      };    
      select = ({e, item,index, selected,files}) => {
          this.toggle(item)
      };
  }
  
  export const slugify = (value='', options={}) => slug((String(value)?.toLocaleLowerCase()), options) || ''
   