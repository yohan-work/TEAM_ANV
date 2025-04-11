import React from "react";

interface HeaderProps {
  onAddEventClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEventClick }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">팀 캘린더</div>
            <span className="ml-2 text-sm text-gray-500">v1.0</span>
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("Add event button clicked in Header");
                onAddEventClick();
              }}
              style={{
                backgroundColor: "#00C1DE",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "1rem",
                  width: "1rem",
                  marginRight: "0.25rem",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              이벤트 추가
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
