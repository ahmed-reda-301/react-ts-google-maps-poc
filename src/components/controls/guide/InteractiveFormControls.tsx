import React from "react";
import {
  CircleControlsProps,
  PolygonControlsProps,
  PolylineControlsProps,
} from "../../../types/controls";

// Union type for all possible control props
type ControlProps =
  | CircleControlsProps
  | PolygonControlsProps
  | PolylineControlsProps;

interface InteractiveFormControlsProps {
  /** Type of control to render */
  controlType:
    | "circle"
    | "polygon"
    | "polyline"
    | "marker"
    | "infoWindow"
    | "rectangle"
    | "googleMap";
  /** Props specific to the control type */
  controlProps: ControlProps;
  /** Custom title for the controls section */
  title?: string;
  /** Custom description for the controls section */
  description?: string;
  /** Custom styling for the container */
  containerStyle?: React.CSSProperties;
}

/**
 * Reusable Interactive Form Controls Component
 * Renders different control types based on the controlType prop
 */
const InteractiveFormControls: React.FC<InteractiveFormControlsProps> = ({
  controlType,
  controlProps,
  title,
  description,
  containerStyle,
}) => {
  const defaultContainerStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #e9ecef",
    ...containerStyle,
  };

  const renderCircleControls = (props: CircleControlsProps) => {
    const { selectedExample } = props;

    // Basic Circle Controls
    if (selectedExample === "basic" && props.basicRadius !== undefined) {
      return (
        <>
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🎛️ {title || "Radius Control"}
          </h3>
          {description && (
            <p
              style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}
            >
              {description}
            </p>
          )}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#495057",
              }}
            >
              Radius:{" "}
              {props.basicRadius >= 1000
                ? `${props.basicRadius / 1000}km`
                : `${props.basicRadius}m`}
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="1000"
              value={props.basicRadius}
              onChange={(e) =>
                props.onBasicRadiusChange?.(parseInt(e.target.value))
              }
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "#e9ecef",
                outline: "none",
                cursor: "pointer",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "15px", fontSize: "14px" }}>
            <div
              style={{
                padding: "10px 15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #dee2e6",
                fontWeight: "500",
              }}
            >
              Area: {props.calculateArea?.(props.basicRadius)} km²
            </div>
          </div>
        </>
      );
    }

    // Coverage Areas Controls
    if (selectedExample === "coverage" && props.coverageAreas) {
      return (
        <>
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            📡 {title || "Coverage Areas"}
          </h3>
          <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}>
            {description ||
              "Click on any circle to highlight it and see details"}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {props.coverageAreas.map((area) => (
              <div
                key={area.id}
                style={{
                  padding: "16px",
                  backgroundColor:
                    props.selectedArea === area.id
                      ? area.color + "20"
                      : "white",
                  border: `2px solid ${area.color}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform:
                    props.selectedArea === area.id ? "scale(1.02)" : "scale(1)",
                  boxShadow:
                    props.selectedArea === area.id
                      ? "0 4px 12px rgba(0,0,0,0.15)"
                      : "0 2px 4px rgba(0,0,0,0.1)",
                }}
                onClick={() => props.onAreaClick?.(area.id)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "22px", marginRight: "10px" }}>
                    {area.icon}
                  </span>
                  <strong style={{ fontSize: "15px", color: "#212529" }}>
                    {area.name}
                  </strong>
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#6c757d",
                    lineHeight: "1.4",
                  }}
                >
                  <div style={{ marginBottom: "4px" }}>
                    <strong>Radius:</strong>{" "}
                    {area.radius >= 1000
                      ? `${area.radius / 1000}km`
                      : `${area.radius}m`}
                  </div>
                  <div
                    style={{ marginBottom: "4px", textTransform: "capitalize" }}
                  >
                    <strong>Type:</strong> {area.type}
                  </div>
                  <div style={{ fontStyle: "italic", color: "#868e96" }}>
                    {area.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    // Interactive Builder Controls
    if (selectedExample === "interactive" && props.circles) {
      return (
        <>
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🎮 {title || "Circle Builder Controls"}
          </h3>
          <p style={{ margin: "0 0 20px 0", color: "#666", fontSize: "14px" }}>
            {description ||
              (props.isCreating
                ? "Click on the map to place a circle"
                : 'Configure your circle settings and click "Start Creating" to add circles to the map')}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Radius:{" "}
                {props.selectedRadius && props.selectedRadius >= 1000
                  ? `${props.selectedRadius / 1000}km`
                  : `${props.selectedRadius}m`}
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={props.selectedRadius}
                onChange={(e) =>
                  props.onRadiusChange?.(parseInt(e.target.value))
                }
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "3px",
                  background: "#e9ecef",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Color:
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {props.componentColors?.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => props.onColorChange?.(color.value)}
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: color.value,
                      border:
                        props.selectedColor === color.value
                          ? "3px solid #212529"
                          : "2px solid #dee2e6",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      transform:
                        props.selectedColor === color.value
                          ? "scale(1.1)"
                          : "scale(1)",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={props.onStartCreating}
              style={{
                padding: "12px 24px",
                backgroundColor: props.isCreating ? "#dc3545" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s ease",
              }}
            >
              {props.isCreating ? "Cancel Creating" : "Start Creating"}
            </button>

            <button
              onClick={props.onClearCircles}
              disabled={props.circles.length === 0}
              style={{
                padding: "12px 24px",
                backgroundColor:
                  props.circles.length > 0 ? "#6c757d" : "#e9ecef",
                color: props.circles.length > 0 ? "white" : "#6c757d",
                border: "none",
                borderRadius: "8px",
                cursor: props.circles.length > 0 ? "pointer" : "not-allowed",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s ease",
              }}
            >
              Clear All
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #dee2e6",
                fontWeight: "600",
              }}
            >
              <strong>Circles:</strong> {props.circles.length}
            </div>

            {props.circles.length > 0 && (
              <div
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  border: "1px solid #dee2e6",
                  fontWeight: "600",
                }}
              >
                <strong>Total Area:</strong> {props.calculateTotalArea?.()} km��
              </div>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  const renderPolygonControls = (props: PolygonControlsProps) => {
    return (
      <>
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🔷 {title || "Polygon Controls"}
        </h3>
        {description && (
          <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}>
            {description}
          </p>
        )}
        {/* Add polygon-specific controls here */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, color: "#6c757d" }}>
            Polygon controls implementation
          </p>
        </div>
      </>
    );
  };

  const renderPolylineControls = (props: PolylineControlsProps) => {
    return (
      <>
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          📏 {title || "Polyline Controls"}
        </h3>
        {description && (
          <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}>
            {description}
          </p>
        )}
        {/* Add polyline-specific controls here */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, color: "#6c757d" }}>
            Polyline controls implementation
          </p>
        </div>
      </>
    );
  };

  const renderControls = () => {
    switch (controlType) {
      case "circle":
        return renderCircleControls(controlProps as CircleControlsProps);
      case "polygon":
        return renderPolygonControls(controlProps as PolygonControlsProps);
      case "polyline":
        return renderPolylineControls(controlProps as PolylineControlsProps);
      default:
        return (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, color: "#6c757d" }}>
              Control type "{controlType}" not implemented yet
            </p>
          </div>
        );
    }
  };

  return <div style={defaultContainerStyle}>{renderControls()}</div>;
};

export default InteractiveFormControls;
