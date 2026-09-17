import { DEFAULT_MODELS } from '../models'

export default function ModelPicker() {
  const model = DEFAULT_MODELS[0]

  return (
    <div className="model-picker">
      <span className="model-picker-label">Model</span>
      <span className="model-picker-select">{model.name} · {model.provider}</span>
      <p className="model-picker-blurb">{model.blurb}</p>
    </div>
  )
}
