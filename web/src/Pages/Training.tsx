import React, { useState } from 'react';

const TrainingPage: React.FC = () => {
  const [trainingStatus, setTrainingStatus] = useState<string>('');

  const handleStartTraining = () => {
    setTrainingStatus('Training started...');

    // Simulate long-running process
    setTimeout(() => {
      setTrainingStatus('Training completed successfully!');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1>Attendance Training</h1>
      <button onClick={handleStartTraining} style={{ padding: '0.5rem 1rem' }}>
        Start Training
      </button>
      {trainingStatus && <p style={{ marginTop: '1rem' }}>{trainingStatus}</p>}
    </div>
  );
};

export default TrainingPage;
