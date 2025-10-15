import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import '../styles/Footer.css';



const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-3">
      <Container>
        <Row className="mb-1 text-center text-md-start">

          {/* Columna 1: Contacto */}
          <Col lg={4} className="mb-3 text-center text-md-start d-none d-md-block">
            <h5>Contacto</h5>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              contacto@ecommerce.com
            </p>
            <p>
              <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
              +54 9 11 1234-5678
            </p>
          </Col>

          {/* Columna 2: Redes Sociales */}
          <Col xs={4} lg={4} className="mb-3 text-center redes">
            <h5>Síguenos</h5>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </Col>

          {/* Columna 3: Información */}
          <Col xs={8} lg={4} className=" py-0 mt-1 text-center text-md-end">
            <h5 className="text-center d-none d-md-block">Información</h5>
            <p className="text-center">© 2025 eCommerce <small className="text-secondary">Versión 1.12.0.1</small> <br /> 
            Todos los derechos reservados </p>
            <p className="text-center"> <a href="#"> Términos y condiciones </a> | <a href="#"> Privacidad </a></p>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;