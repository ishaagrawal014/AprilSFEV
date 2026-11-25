import { Col, Container, Row } from "reactstrap";
import {
  FaArrowUp,
  FaBoxOpen,
  FaCheckCircle,
  FaExchangeAlt,
  FaRupeeSign,
  FaShieldAlt,
  FaStar,
  FaTimesCircle,
} from "react-icons/fa";
import comparisonIllustration from "/images/investment-comparison.svg";

type AssetFeatureKey = "return" | "flexibility" | "assetBacked" | "risk" | "income";

const assetClasses = [
  {
    name: "Speed Force EV",
    color: "#1d853e",
    best: true,
    features: {
      return: "Up to 21%",
      flexibility: "High",
      assetBacked: true,
      risk: "Low",
      income: true,
    },
  },
  {
    name: "Mutual Funds",
    color: "#2689ff",
    features: {
      return: "10-15%",
      flexibility: "Moderate",
      assetBacked: false,
      risk: "High",
      income: false,
    },
  },
  {
    name: "Real Estate",
    color: "#ffce56",
    features: {
      return: "8-12%",
      flexibility: "Low",
      assetBacked: true,
      risk: "High",
      income: "Low",
    },
  },
  {
    name: "Gold",
    color: "#ff6384",
    features: {
      return: "8-10%",
      flexibility: "None",
      assetBacked: true,
      risk: "Low",
      income: false,
    },
  },
  {
    name: "Fixed Deposits",
    color: "#4bc0c0",
    features: {
      return: "6-7%",
      flexibility: "Low",
      assetBacked: false,
      risk: "Low",
      income: false,
    },
  },
];

const featureRows: { key: AssetFeatureKey; label: string; icon: JSX.Element }[] = [
  { key: "return", label: "Avg. Return", icon: <FaArrowUp className="text-[#258afe]" /> },
  { key: "flexibility", label: "Flexibility", icon: <FaExchangeAlt className="text-[#ffce56]" /> },
  { key: "assetBacked", label: "Asset Backed", icon: <FaBoxOpen className="text-[#1d853e]" /> },
  { key: "risk", label: "Risk", icon: <FaShieldAlt className="text-[#ff6384]" /> },
  { key: "income", label: "Monthly Income", icon: <FaRupeeSign className="text-[#1d853e]" /> },
];

const InvestmentComparison = () => {
  return (
    <section id="investment-comparison" className="bg-white py-20">
      <Container className="mx-auto max-w-6xl px-4">
        <Row className="flex flex-wrap justify-center text-center">
          <Col lg={8} className="w-full">
            <h2 className="text-3xl font-bold text-[#050505] sm:text-4xl">
              Investment <span className="text-[#258afe]">Comparison</span>
            </h2>
            <p className="mt-4 text-base text-[#1b1b1b]">
              Understand how Speed Force EV stacks up against traditional assets on returns, flexibility, and monthly income.
            </p>
          </Col>
        </Row>

        <Row className="mt-12">
          <Col className="w-full">
            <div className="hidden rounded-3xl border border-[#dee8fb] bg-white p-6 shadow-card lg:block">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `minmax(140px, 1fr) repeat(${assetClasses.length}, minmax(110px, 1fr))`,
                }}
              >
                <div />
                {assetClasses.map((asset) => (
                  <div
                    key={asset.name}
                    className="flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-center text-sm font-semibold text-[#050505]"
                  >
                    <span className="text-base" style={{ color: asset.color }}>
                      {asset.name}
                    </span>
                    {asset.best && (
                      <span className="flex items-center gap-1 rounded-full bg-[#1d853e] px-2 py-[2px] text-xs font-semibold text-white">
                        <FaStar className="text-white" />
                        Best
                      </span>
                    )}
                  </div>
                ))}

                {featureRows.map((row, rowIndex) => (
                  <div key={row.key} className="contents">
                    <div
                      className="flex items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#050505]"
                      style={{ background: rowIndex % 2 === 0 ? "#f0f6ff" : "#edf7f7" }}
                    >
                      <span className="text-lg">{row.icon}</span>
                      {row.label}
                    </div>
                    {assetClasses.map((asset, assetIndex) => {
                      const value = asset.features[row.key];
                      const bgColor = rowIndex % 2 === 0 ? "#f0f6ff" : "#edf7f7";
                      const isEV = asset.name === "Speed Force EV";
                      return (
                        <div
                          key={`${asset.name}-${row.key}`}
                          className="flex items-center justify-center rounded-xl px-2 text-center text-sm font-semibold"
                          style={{
                            background: bgColor,
                            color: isEV ? "#1d853e" : "#505050",
                            borderRight: assetIndex === assetClasses.length - 1 ? "none" : undefined,
                          }}
                        >
                          {row.key === "income" ? (
                            value === true ? (
                              <FaCheckCircle className="text-[#1d853e]" title="Yes" />
                            ) : value === false ? (
                              <FaTimesCircle className="text-[#ff6384]" title="No" />
                            ) : (
                              value
                            )
                          ) : row.key === "assetBacked" ? (
                            value ? (
                              <FaCheckCircle className="text-[#1d853e]" title="Yes" />
                            ) : (
                              <FaTimesCircle className="text-[#ff6384]" title="No" />
                            )
                          ) : (
                            value
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 block rounded-3xl border border-[#dee8fb] bg-white p-6 text-center shadow-card lg:hidden">
              <img
                src={comparisonIllustration}
                alt="Investment comparison chart"
                className="mx-auto w-full max-w-md"
              />
              <p className="mt-4 text-sm font-semibold text-[#050505]">
                Speed Force EV offers the most balanced mix of return, flexibility, and dependable monthly income.
              </p>
            </div>

            <div className="mt-6 text-center text-sm font-semibold text-[#132644]">
              *Analysis based on historical averages of each asset class.
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InvestmentComparison;

