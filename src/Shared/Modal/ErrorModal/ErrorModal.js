import React from 'react';
import ReactDOM from 'react-dom';
import './../modal.scss';

const ModalOverlay = (props) => {
  let modalBody = 'Sorry! Something went wrong.Please try again later.';

  const content = (
    <div className="modal-background">
      <div className={`modal ${props.className}`} style={props.style}>
        <header className={`modal__header ${props.headerClass}`}>
          <h3>Loading Failed</h3>
        </header>
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div className={`modal__content ${props.contentClass}`}>
            <p>{modalBody}</p>
          </div>
          <footer className={`modal__footer ${props.footerClass}`}>
            <button
              type="btn"
              className="btn btn-danger btn-lg"
              onClick={props.onClear}
            >
              Okay
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};
const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {props.error && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default ErrorModal;
