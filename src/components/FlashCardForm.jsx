import { useState } from "react/cjs/react.development"
import TextArea from "./TextArea"
import TextInput from "./TextInput"

export default function FlashCardForm({createMode = true}) {
  
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100'

  const [title, setTitle] = useState('')
  const[description, setDescription] = useState('')

  function handleTitleChange(newTitle) {
    setTitle(newTitle)
  }

  function handleTextAreaChange(newDescription) {
    setDescription(newDescription)
  }

  return(
    <form className={`${backgroundClassName} p-4`}>
      <h2>Manutenção de Flash Cards</h2>

      <TextInput labelDescription="Título:" inputValue={title} onInputChange={handleTitleChange}/>
      <TextArea labelDescription="Descrição" textAreaValue={description} onTextAreaChange={handleTextAreaChange}/>
    </form>
  )
}