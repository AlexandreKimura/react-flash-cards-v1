export default function FlashCard({ 
  id,
  title = 'Título do card', 
  description = 'Descrição do card, que pode conter mais palavras que o título',
  showFlashCardTitle = true, 
  onToggleFlashCard = null,
}) {
  
  /*const [showTitle, setShowTitle] = useState(showFlashCardTitle)

  useEffect(() => {
    setShowTitle(showFlashCardTitle)
  }, [showFlashCardTitle])*/

  const fontSizeClassName = showFlashCardTitle ? 'text-xl' : 'text-sm'

  function handleCardClick() {
    //setShowTitle(currentShowTitle => !currentShowTitle)
    if(onToggleFlashCard) {
      onToggleFlashCard(id)
    }
  }

  return (
    <div className={`shadow-lg p-4 m-2 w-80 h-48 cursor-pointer
      flex flex-row items-center justify-center
      font-semibold ${fontSizeClassName}`} 
      style={{fontFamily: "'JetBrains Mono', monospace"}}
      onClick={handleCardClick}
      >
      {showFlashCardTitle ? title : description}
    </div>
  )
}