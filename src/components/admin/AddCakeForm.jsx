import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {useContext, useEffect, useState} from "react";
import {Input} from "../global/Input.jsx";
import {GiCupcake} from "react-icons/gi";
import {FaCamera, FaEuroSign, FaRegCheckCircle} from "react-icons/fa";
import {PanelButton} from "./PanelButton.jsx";
import {Alert} from "../global/Alert.jsx";
import {isNumeric} from "../../utils/maths.js";
import {StoreContext} from "../../context/StoreContext.jsx";

export function AddCakeForm() {
    const [addedCake, setAddedCake] = useState(false)
    const {store, setStore} = useContext(StoreContext)
    const emptyItem = {
        id: 0,
        imageSource: "",
        title: "",
        price: "",
        quantity: 0,
        isAvailable: true,
        isAdvertised: false,
    }
    const [newCake, setNewCake] = useState(
        emptyItem
    )
    const [error, setError] = useState({
        title: false,
        price: false,
        imageSource: false
    })
    const handleChangeName = (e) => {
        const title = e.target.value
        setNewCake(prevState => {
            return {...prevState, title}
        })
    }
    const handleChangeUrl = (e) => {
        const imageSource = e.target.value
        setNewCake(prevState => {
            return {...prevState, imageSource}
        })
    }
    const handleChangePrice = (e) => {
        const price = e.target.value;
        if(isNumeric(price)) {
            setError(prevState => {return {...prevState, price: false}})
            setNewCake(prevState => {
                return {...prevState, price}
            })
        } else {
            //setError(prevState => {return {...prevState, price: true}})
        }
    }
    const handleAddCake = () => {
        //const id = store.length > 0 ? store.length + 1 : 1;
        const id = crypto.randomUUID()
        //console.log(id)
        const cakeToAdd = {
            id: id,
            imageSource: newCake.imageSource,
            title: newCake.title,
            price: newCake.price,
            quantity: newCake.quantity,
            isAvailable: newCake.isAvailable,
            isAdvertised: newCake.isAdvertised,
        };
        setStore([cakeToAdd, ...store])
        setAddedCake(true)
        setTimeout(() => setAddedCake(false), 2000)
        setNewCake(emptyItem)
    }
    return (
        <Form>
            <Image>{newCake.imageSource === '' ? 'Aucune image' : <img src={newCake.imageSource} alt={'Il y a un problème avec votre image'}/>}</Image>
            <Fields>
                <Input placeholder={'Nom du produit'} width={'300'} icon={<GiCupcake />} onInput={() => handleChangeName(event)} error={error.title} value={newCake.title}/>
                <Input placeholder={'Lien url d\'une image (ex: https://la-photo-de-mo-produit.png)' } width={'650'} icon={<FaCamera />} onInput={() => handleChangeUrl(event)} error={error.imageSource} value={newCake.imageSource}/>
                <Input placeholder={'Prix'} width={'150'} icon={<FaEuroSign />} type={'number'} onInput={() => handleChangePrice(event)} error={error.price} value={newCake.price}/>
                <Validation>
                    <PanelButton text={'Ajouter un nouveau produit'} success onClick={() => handleAddCake()} />
                    { addedCake && <Alert message={"Ajouté avec succès"} icon={<FaRegCheckCircle />} color={theme.colors.success}/>}
                </Validation>
            </Fields>
        </Form>
    )
}

const Form = styled.div`
  height: 70%;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`

const Validation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`