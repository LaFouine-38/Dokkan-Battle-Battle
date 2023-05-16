/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';

// Styles
import styles from './DrawsSummary.module.css';

function DrawsSummary({ draws, drawsStep, drawDraft }) {
  const drawsArray = Object.keys(draws);
  return (
    <div className={styles['dbb-summary']}>
      {drawsArray.map((key) => (
        <div key={key} className={styles['dbb-summary__container']}>
          <div className={styles['dbb-summary-title']}>
            <h3 className={styles['dbb-summary-player']}>
              Player
              {' '}
              {key}
            </h3>
            {drawsStep && key === 1 && (
              <div className={styles['dbb-summary__draft']}>
                <span className={styles['dbb-summary__draft-text']}>Click top number to draw</span>
                <span className={styles['dbb-summary__draft-text']}>Click bottom number to draw column</span>
                <span className={`
                      ${styles['dbb-summary-player']}
                      ${styles['dbb-summary-player__draft']}
                      ${styles['dbb-summary-player--pulse']}`}
                >
                  Draft open
                </span>
              </div>
            )}
          </div>
          <div className={styles['dbb-summary__items']}>
            {draws[key].draws.map((playerDraw, index) => (
              <div
                key={index}
                className={`
                ${styles['dbb-summary__item']}
                ${!playerDraw.line ? styles['dbb-summary__item--disabled'] : ''}
                ${drawsStep ? styles['dbb-summary__item--pulse-grey'] : ''}
                ${index === draws[key].draws.length - 1 ? styles['dbb-summary__item--no-mr'] : ''}`}
              >
                <button
                  type="button"
                  className={`
                  ${styles['dbb-summary__number']}
                  ${drawsStep ? styles['dbb-summary__clickable'] : ''}`}
                  onClick={() => drawDraft(key, playerDraw, draws[key].draws, false)}
                >
                  <span className={styles['dbb-summary__cat']}>L</span>
                  {playerDraw.line}
                </button>
                <button
                  type="button"
                  className={`
                      ${styles['dbb-summary__number']} 
                      ${drawsStep ? styles['dbb-summary__clickable'] : ''}
                      `}
                  onClick={() => drawDraft(key, playerDraw, draws[key].draws, true)}
                >
                  <span className={styles['dbb-summary__cat']}>C</span>
                  {playerDraw.column}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

DrawsSummary.propTypes = {
  draws: PropTypes.shape({
    id: PropTypes.number,
    draws: PropTypes.arrayOf(PropTypes.shape({
      line: PropTypes.number,
      column: PropTypes.number,
    })),
  }).isRequired,
  drawsStep: PropTypes.bool,
  drawDraft: PropTypes.func,
};

DrawsSummary.defaultProps = {
  drawsStep: false,
  drawDraft: () => {},
};

export default DrawsSummary;
