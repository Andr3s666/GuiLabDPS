import React from 'react';
import StepScreen from './StepScreen';

const StepsScreen = ({ steps, navigation }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Inicio');
    }
  };

  return (
    <StepScreen
    title={steps[currentStep].title} // Cambiado de step a title
    description={steps[currentStep].description}
    onNextStep={handleNextStep}
    />
  );
};

export default StepsScreen;