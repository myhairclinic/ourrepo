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
          height: 45px;
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
          font-size: 24px;
          font-weight: bold;
          position: relative;
          display: flex;
          align-items: center;
          letter-spacing: 1px;
        }
        .orange-strand {
          width: 16px;
          height: 32px;
          margin: 0 4px;
          position: relative;
          display: inline-block;
        }
        .orange-strand:before {
          content: '';
          position: absolute;
          width: 4px;
          height: 32px;
          background-color: #ffa500;
          top: -3px;
          left: 6px;
          border-radius: 2px;
          transform: skewX(5deg);
          box-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
        }
        .orange-strand:after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, rgba(255,165,0,0.2) 0%, rgba(255,165,0,0) 70%);
          top: 5px;
          left: 2px;
        }
        .brown-text {
          color: #8b6f58;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        @media (min-width: 768px) {
          .logo-container {
            height: 55px;
          }
          .blue-text {
            font-size: 28px;
          }
          .orange-strand {
            width: 18px;
            height: 36px;
          }
          .orange-strand:before {
            height: 36px;
          }
          .brown-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}