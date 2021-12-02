import { getNewId } from "../service/idService";

export default function TextArea({
  labelDescription = 'Descrição do label:',
  textAreaValue = 'Valor padrão do text area',
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        className="border p-1"
        maxLength={maxLength}
        rows={rows}
        type="text"
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
    </div>
  );
}
