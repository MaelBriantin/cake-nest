import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../context/StoreContext.jsx";
import {Input} from "../global/Input.jsx";
import {FaCamera, FaEuroSign, FaRegCheckCircle} from "react-icons/fa";
import {GiCupcake} from "react-icons/gi";
import {theme} from "../../theme/index.js";
import {HiCursorClick} from "react-icons/hi";

export function EditCakeForm() {
    const {selectedItem, store, setStore, setSelectedItem} = useContext(StoreContext)
    useEffect(() => {
        //console.log(selectedItem)
    }, [selectedItem, setSelectedItem]);
    const handleChangeTitle = (e) => {
        const storeCopy = [...store]
        storeCopy.map(i => {
            if (i.id === selectedItem.id) {
                i.title = e.target.value
            }
        })
        setStore(storeCopy)
    }
    const handleChangeUrl = (e) => {
        if(selectedItem !== {}) {
            const storeCopy = [...store]
            storeCopy.map(i => {
                if (i.id === selectedItem.id) {
                    i.imageSource = e.target.value
                }
            })
            setStore(storeCopy)
        }
    }
    const handleChangePrice = (e) => {
        const storeCopy = [...store]
        storeCopy.map(i => {
            if (i.id === selectedItem.id) {
                i.price = e.target.value
            }
        })
        setStore(storeCopy)
    }
    const deleteElement = () => {
        setSelectedItem({})
        // console.log(selectedItem)
    }
    //console.log(selectedItem.price)
    return (
        Object.keys(selectedItem).length !== 0 ? (
            <Form>
                <Image>
                    {selectedItem.imageSource === '' ? 'Aucune image' : <img src={selectedItem.imageSource} alt={'Il y a un problème avec votre image'} />}
                </Image>
                <Fields>
                    <Input placeholder={'Nom du produit'} width={'300'} icon={<GiCupcake />} value={selectedItem.title || ''} onInput={() => handleChangeTitle(event)} />
                    <Input placeholder={'Lien url d\'une image (ex: https://la-photo-de-mo-produit.png)'} width={'650'} icon={<FaCamera />} value={selectedItem.imageSource || ''} onInput={() => handleChangeUrl(event)} />
                    <Input placeholder={'Prix'} width={'150'} icon={<FaEuroSign />} type={'number'} value={selectedItem.price} onInput={() => handleChangePrice(event)} />
                    <p>Cliquer sur le produit pour le modifier en <u>temps réel</u></p>
                </Fields>
            </Form>
        ) : (
            <Form>
                <NoSelectionStyle><p>Cliquez sur un produit pour le modifier</p><HiCursorClick /></NoSelectionStyle>
            </Form>
        )
    );
}


const Form = styled.div`
  height: 70%;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`

const NoSelectionStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 60%;
  font-family: 'Pacifico', 'sans-serif';
  font-size: ${theme.fonts.size.P4};
  color: ${theme.colors.greyMedium};
`

const Image = styled.div`
  height: 150px;
  width: 300px;
  border: 1px solid ${theme.colors.greyMedium};
  border-radius: ${theme.borderRadius.round};
  color: ${theme.colors.greyMedium};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Fields = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  p{
   color: ${theme.colors.primary}; 
  }
`

const Validation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`