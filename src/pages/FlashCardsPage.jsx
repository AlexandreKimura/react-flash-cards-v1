import { useEffect, useState } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import Button from '../components/Button'
import Error from '../components/Error'
import FlashCard from '../components/FlashCard'
import FlashCardForm from '../components/FlashCardForm'
import FlashCardItem from '../components/FlashCardItem'
import FlashCards from '../components/FlashCards'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Main from '../components/Main'
import RadioButton from '../components/RadioButton'
import { helperShuffleArray } from '../helpers/arrayHelpers'
import { getAllFlashCardsApi } from '../service/apiService'

export default function FlashCardsPage() {

  const [allCards, setAllCards] = useState([])
  
  const [studyCards, setStudyCards] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [createMode, setCreateMode] = useState(true)

  const [selecedTab, setSelectedTab] = useState(0)
  const [selectedFlashCard, setSelectedFlashCard] = useState(null)

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true)

  useEffect(() => {
    async function getAllCards() {
      try{
        const backendAllCards = await getAllFlashCardsApi()
        setAllCards(backendAllCards)

        setTimeout(() => {
          setLoading(false)
        }, 500)
      } catch(err) {
        setError(err.message)
      }
    }

    getAllCards();
  }, [])

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards)
    setStudyCards(shuffledCards)
  }

  useEffect(() => {
    setStudyCards(allCards.map(card => ({...card, showTitle0: true})))
  }, [allCards])

  function handleRadioShowTitleClick() {
    const updatedCards = [...studyCards].map(card => 
      ({...card, showTitle: true})
    )

    setStudyCards(updatedCards)

    setRadioButtonShowTitle(true)
  }

  function handleRadioShowDescriptionClick() {

    const updatedCards = [...studyCards].map(card => 
      ({...card, showTitle: false})
    )

    setStudyCards(updatedCards)

    setRadioButtonShowTitle(false)
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards]
    const cardIndex = updatedCards.findIndex(card => card.id === cardId)
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle

    setStudyCards(updatedCards)
  }

  function handleDeleteFlashCard(cardId) {
    setAllCards(allCards.filter(card => card.id !== cardId))
  }

  function handleEditFlashCard(card) {
    setCreateMode(false)
    setSelectedTab(1)
    setSelectedFlashCard(card)
  }

  function handleTabSelected(tabIndex) {
    setSelectedTab(tabIndex)
  }

  let mainJsx = (
    <div className="flex justify-center mt-4">
      <Loading />
    </div>
  )

  if(error) {
    mainJsx = <Error>{error}</Error>
  }

  if(!loading) {
    mainJsx = (
      <>

        <Tabs selectedIndex={selecedTab} onSelect={handleTabSelected}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              )
            })}
          </TabPanel>
          <TabPanel>
            <FlashCardForm createMode={createMode}></FlashCardForm>
          </TabPanel>
          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
            </div>

            <div className="flex flex-row items-center justify-center space-x-4 x-4">
              <RadioButton 
                id="radioButtonShowTitle" 
                name="showInfo" 
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitleClick}
              >
                Mostrar Título
              </RadioButton>
              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescriptionClick}
              >
                Mostrar Descrição
              </RadioButton>
            </div>

            <FlashCards>
              {
                studyCards.map(({ id, title, description, showTitle }) => {
                  return <FlashCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={handleToggleFlashCard} 
                  />
                })
              }
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    )
  }

  return(
    <>
      <Header>react-flash-cards-v1</Header>
      <Main>{mainJsx}</Main>
    </>
  )
}