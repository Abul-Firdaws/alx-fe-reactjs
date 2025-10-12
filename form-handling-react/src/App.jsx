import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
        Form Handling Comparison
      </h1>

      <div style={{ marginBottom: '50px' }}>
        <h3 style={{ textAlign: 'center' }}>
          Version 1: Controlled Components
        </h3>
        <RegistrationForm />
      </div>

      <div>
        <h3 style={{ textAlign: 'center' }}>
          Version 2: Formik Integration
        </h3>
        <FormikForm />
      </div>
    </div>
  )
}

export default App;
