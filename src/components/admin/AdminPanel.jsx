import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Tab} from "../global/Tab.jsx";
import {AdminContext} from "../../context/AdminContext.jsx";
import {useContext, useEffect, useState} from "react";
import {IoMdAdd} from "react-icons/io";
import {MdEdit} from "react-icons/md";
import {AddCakeForm} from "./AddCakeForm.jsx";
import {EditCakeForm} from "./EditCakeForm.jsx";
export const AdminPanel = () => {
    const {openedPanel, adminMode, selectedTab, setSelectedTab} = useContext(AdminContext)
    const [selectedAdd, setSelectedAdd] = useState(false)
    const [selectedModify, setSelectedModify] = useState(false)
    const handleAdd = () => {
        setSelectedTab('add')
    }
    const handleEdit = () => {
        setSelectedTab('edit')
    }
    useEffect(() => {
        setSelectedAdd(selectedTab === 'add');
        setSelectedModify(selectedTab === 'edit');
    }, [selectedTab]);
    return (
        <Panel $openedPanel={openedPanel} $adminMode={adminMode}>
            <Tabs>
                <Tab openTab={true} />
                <Tab value={'Ajouter'} onClick={() => handleAdd()} icon={<IoMdAdd />} isSelected={selectedAdd}/>
                <Tab value={'Modifier'} onClick={() => handleEdit()} icon={<MdEdit />} isSelected={selectedModify}/>
            </Tabs>
            <Content>
                {selectedTab === 'add'
                    ? <AddCakeForm/>
                    : <EditCakeForm/>
                }
            </Content>
        </Panel>
    )
}


const Panel = styled.div`
  display: ${props => props.$adminMode ? "block" : "none"};
  height: 400px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 400ms;
  transform: translateY(${props => props.$openedPanel ? "90%" : "0%"});
`

const Tabs = styled.div`
  margin-left: 150px;
  width: fit-content;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Content = styled.div`
  height: 100%;
  width: 100%;
  background: ${theme.colors.background_white};
  border-top: ${theme.colors.greyMedium} 1px solid;
  box-shadow: ${theme.shadows.card};
`