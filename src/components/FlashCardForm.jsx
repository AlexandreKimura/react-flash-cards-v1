import { useState } from "react/cjs/react.development"
import Button from "./Button"
import TextArea from "./TextArea"
import TextInput from "./TextInput"

export default function FlashCardForm({createMode = true, onPersist = null}) {
  
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100'

  const [title, setTitle] = useState('')
  const[description, setDescription] = useState('')

  function handleTitleChange(newTitle) {
    setTitle(newTitle)
  }

  function clearFiels() {
    setTitle('')
    setDescription('')
  }

  function handleTextAreaChange(newDescription) {
    setDescription(newDescription)
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    if(onPersist) {
      onPersist(createMode, title, setTitle)
      clearFiels()
    }
  }

  function handleFormReset(event) {
    clearFiels()
  }

  return(
    <form className={`${backgroundClassName} p-4`} onSubmit={handleFormSubmit} onReset={handleFormReset}>
      <h2>Manutenção de Flash Cards</h2>

      <TextInput labelDescription="Título:" inputValue={title} onInputChange={handleTitleChange}/>
      <TextArea labelDescription="Descrição" textAreaValue={description} onTextAreaChange={handleTextAreaChange}/>

      <div className="flex items-center justify-end">
        <Button colorClass="bg-red-400" type="reset">Limpar</Button>
        <Button colorClass="bg-green-300" type="submit">Salvar</Button>
      </div>
    </form>
  )
}