import 'bootstrap/dist/css/bootstrap.min.css';
import { initMiddleware } from 'devise-axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import App from './App';
import './index.css';
import AuthProvider from "./providers/AuthProvider";
import JobappProvider from './providers/JobappProvider';
import NoteProvider from './providers/NoteProvider';
import InterviewProvider from './providers/InterviewProvider';

initMiddleware();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <JobappProvider>
          <NoteProvider>
            <InterviewProvider>
              <App />
            </InterviewProvider>
          </NoteProvider>
        </JobappProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);