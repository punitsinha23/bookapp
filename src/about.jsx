import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">About Our Book Sharing Platform</h1>
        <p className="lead mt-3">
          Discover, upload, and download books — completely free!
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="fs-5">
                Welcome to our free book sharing community! This platform allows users to:
              </p>

              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">
                  <strong>📘 Upload Books:</strong> Share your favorite books by uploading PDFs or eBooks.
                </li>
                <li className="list-group-item">
                  <strong>🔍 Search Books:</strong> Quickly find books using our powerful search feature.
                </li>
                <li className="list-group-item">
                  <strong>📥 Download for Free:</strong> Every book is available to download without cost.
                </li>
              </ul>

              <p className="fs-5">
                Whether you're a student, a casual reader, or a hardcore bookworm, our platform is made for you. 
                We believe in open access to knowledge and reading resources.
              </p>

              <p className="fs-5">
                Start exploring today — and don't forget to give back by uploading your favorite reads!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
