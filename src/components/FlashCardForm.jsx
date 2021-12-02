import { useEffect, useState } from "react/cjs/react.development"
import Button from "./Button"
import Error from "./Error"
import TextArea from "./TextArea"
import TextInput from "./TextInput"

export default function FlashCardForm({createMode = true, onPersist = null, children: flashCard = null}) {
  
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100'

  const [title, setTitle] = useState(flashCard?.title || '')
  const[description, setDescription] = useState(flashCard?.description || '')
  const[error, setError] = useState('')

  useEffect(() => {
    if(createMode) {
      setTitle('')
      setDescription('')
    }
  }, [createMode])

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

  function validateForm() {
    return title.trim() !== '' && description.trim() !== ''
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    if(validateForm()){
      setError('')

      if(onPersist) {
        onPersist(title, description)
        clearFiels()
      }
    }else {
      setError('Título e Descrição são obrigatório!')
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

      <div className="flex items-center justify-between">
        {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}
        <div>
          <Button colorClass="bg-red-400" type="reset">Limpar</Button>
          <Button colorClass="bg-green-300" type="submit">Salvar</Button>
        </div>
      </div>
    </form>
  )
}