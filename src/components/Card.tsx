interface CardProps {
  name: string;
  startPoint: string;
  endPoint: string;
  priceSmallVehicle: number;
  priceLargeVehicle: number;
}

export const Card: React.FC<CardProps> = ({
  name,
  startPoint,
  endPoint,
  priceSmallVehicle,
  priceLargeVehicle,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>
        <strong>Start:</strong> {startPoint} <br />
        <strong>End:</strong> {endPoint}
      </p>
      <p>
        <strong>Small Vehicle:</strong> {priceSmallVehicle} EGP <br />
        <strong>Large Vehicle:</strong> {priceLargeVehicle} EGP
      </p>
    </div>
  );
};
