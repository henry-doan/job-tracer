import Alert from 'react-bootstrap/Alert';

const FlashMessage = ({ variant, txt, setClose }) => (
  <>
    <Alert variant={variant} onClose={() => setClose} dismissible>
      {txt}
    </Alert>
  </>
);

export default FlashMessage;