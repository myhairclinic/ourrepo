import React from 'react';

export default function AppLogo() {
  return (
    <div className="logo-container">
      <div className="my-hair-logo">
        <div className="blue-text">MY <span className="orange-strand"></span> HAIR</div>
        <div className="brown-text">Transplantation Center</div>
      </div>
      <style>{`
        .logo-container {
          width: auto;
          height: 40px;
          display: flex;
          align-items: center;
        }
        .my-hair-logo {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .blue-text {
          color: #0064b0;
          font-size: 18px;
          font-weight: bold;
          position: relative;
          display: flex;
          align-items: center;
          letter-spacing: 1px;
        }
        .orange-strand {
          width: 14px;
          height: 24px;
          margin: 0 4px;
          position: relative;
          display: inline-block;
        }
        .orange-strand:before {
          content: '';
          position: absolute;
          width: 3px;
          height: 24px;
          background-color: #ffa500;
          top: -2px;
          left: 6px;
          border-radius: 2px;
          transform: skewX(5deg);
          box-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
        }
        .orange-strand:after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, rgba(255,165,0,0.2) 0%, rgba(255,165,0,0) 70%);
          top: 5px;
          left: 2px;
        }
        .brown-text {
          color: #8b6f58;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        @media (min-width: 768px) {
          .logo-container {
            height: 45px;
          }
          .blue-text {
            font-size: 22px;
          }
          .orange-strand {
            width: 16px;
            height: 30px;
          }
          .orange-strand:before {
            height: 30px;
          }
          .brown-text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}