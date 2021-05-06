export const addVectors = <TVector extends number[]>(...vectors: TVector[]) => {
  return vectors.reduce(
    (acc, vector) => acc.map((n, i) => n + vector[i]) as TVector
  );
};

// export const multiplyByScalar = <TVector extends number[]>(
//   vector: TVector,
//   scalar: number
// ) => {
//   return vector.map((v) => v * scalar) as TVector;
// };

export const multiplyVectors = <TVector extends number[]>(
  ...vectors: TVector[]
) =>
  vectors.reduce((acc, vector) => acc.map((n, i) => n * vector[i]) as TVector);

// export const ceilingVector = <TVector extends number[]>(vector: TVector) => {
//   return vector.map((n) => Math.ceil(n));
// };
