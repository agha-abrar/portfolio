import { DEFAULT_MODELS } from '../models'

export default function ModelPicker({ value, onChange, disabled }) {
  const selected = DEFAULT_MODELS.find((m) => m.id === value) || DEFAULT_MODELS[0]

  return (
    <label className="model-picker">
      <span className="model-picker-label">Model</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="model-picker-select"
        aria-label="Choose AI model"
      >
        {DEFAULT_MODELS.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} · {m.provider}
          </option>
        ))}
      </select>
      <p className="model-picker-blurb">{selected.blurb}</p>
    </label>
  )
}
