import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number 
  onChange?: (rating: number) => void
  readOnly?: boolean
}

export function StarRating({ value, onChange, readOnly = false }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= value
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-100 text-slate-300'
          } ${!readOnly ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => {
            if (!readOnly && onChange) {
              onChange(star)
            }
          }}
        />
      ))}
    </div>
  )
}