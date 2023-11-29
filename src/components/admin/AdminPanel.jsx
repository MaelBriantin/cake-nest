import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Tab} from "../global/Tab.jsx";
import {AdminContext} from "../../context/AdminContext.jsx";
import {useContext, useEffect, useState} from "react";
import {IoMdAdd} from "react-icons/io";
import {MdEdit} from "react-icons/md";
import {AddCakeForm} from "./AddCakeForm.jsx";
import {EditCakeForm} from "./EditCakeForm.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
export const AdminPanel = () => {
    const {user, color, setColor} = useContext(UserContext)
    const {openedPanel, setOpenedPanel, adminMode, selectedTab, setSelectedTab} = useContext(AdminContext)
    const {openedCart} = useContext(StoreContext)
    const [selectedAdd, setSelectedAdd] = useState(false)
    const [selectedModify, setSelectedModify] = useState(false)
    const [count, setCount] = useState(0)
    //const [color, setColor] = useState(theme.colors.primary)
    const handleAdd = () => {
        setOpenedPanel(false)
        setSelectedTab('add')
    }
    const handleEdit = () => {
        setOpenedPanel(false)
        setSelectedTab('edit')
    }
    useEffect(() => {
        setSelectedAdd(selectedTab === 'add');
        setSelectedModify(selectedTab === 'edit');
    }, [selectedTab]);
    const changeColor = () => {
        count < 10 && setCount(count +1)
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        setColor(`#${'0'.repeat(6 - randomColor.length)}${randomColor}`);
    }
    const stopColor = () => {
        setCount(0)
        setColor(theme.colors.primary)
    }

    useEffect(() => {
        let interval;
        if (count === 10) {
            interval = setInterval(() => {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                setColor(`#${'0'.repeat(6 - randomColor.length)}${randomColor}`);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [count, setCount]);
    return (
        <Panel $openedPanel={openedPanel} $adminMode={adminMode} $openedCart={openedCart}>
            <Tabs>
                <Tab openTab={true} />
                <Tab value={'Ajouter'} onClick={() => handleAdd()} icon={<IoMdAdd />} isSelected={selectedAdd}/>
                <Tab value={'Modifier'} onClick={() => handleEdit()} icon={<MdEdit />} isSelected={selectedModify}/>
            </Tabs>
            <Content>
                {selectedTab === 'add'
                    ? <AddCakeForm/>
                    : selectedTab === 'edit'
                    ? <EditCakeForm/>
                        : <Default $color={color}>
                            { count < 10 ? <p>Hey,&#x20;<span onClick={() => changeColor()}>{user}</span>&#x20;! Ça va ?</p>
                            : <p>IT'S&#x20;<span onClick={() => stopColor()}>RAINBOW</span>&#x20;TIME!!!</p>}
                        </Default>
                }
            </Content>
        </Panel>
    )
}


const Panel = styled.div`
  display: ${props => props.$adminMode ? "block" : "none"};
  position: absolute;
  z-index: 3;
  bottom: 0;
  right: 0;
  height: 350px;
  width: ${props => props.$openedCart ? '100%' : '80%'};
  transition: all 400ms;
  transform: translateY(${props => props.$openedPanel ? "100%" : "0%"});
`

const Tabs = styled.div`
  margin-left: 150px;
  width: fit-content;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: -40px;
  left: 0;
`

const Content = styled.div`
  height: 100%;
  width: 100%;
  background: ${theme.colors.background_white};
  border: ${theme.colors.greyMedium} 1px solid;
  //box-shadow: ${theme.shadows.card};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Default = styled.div`
  user-select: none;
  font-size: ${theme.fonts.size.P4};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    transition: all 400ms;
    font-weight: ${theme.fonts.weights.bold};
    color: ${props => props.$color};
  }
`