import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Card({ children, image, titleImage, footer }) {
  const { t } = useTranslation()
  return (

    <div className="card">
      <div className="card-body d-flex flex-column flex-md-row flex-wrap flex-md-nowrap justify-content-between align-items-center m-5
            gap-4 "
      >
        <img src={image} className="rounded-circle " alt={titleImage} />
        {children}
      </div>
      {
        footer && (
          <div className="card-footer p-3">
            <div className="text-center">
              <span>
                {t('phrase.notAccount')}
              </span>
              <Link to="/signup">
                {t('phrase.registration')}
              </Link>
            </div>
          </div>
        )
      }
    </div>

  )
}

export default Card
