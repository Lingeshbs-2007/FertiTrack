import { ethers } from "ethers";
import {
  getReadContract,
  getWriteContract,
} from "../contract/contract";
/**
 * Adds a new farmer.
 * Admin only.
 */
export const addFarmer = async (
  aadhaarHash: string,
  name: string,
  location: string,
  fertilizerKg: number
) => {
  const contract = await getWriteContract();

  const tx = await contract.addFarmer(
    aadhaarHash,
    name,
    location,
    BigInt(fertilizerKg)
  );

  await tx.wait();

  return tx;
};

/**
 * Returns basic farmer details.
 */
export const getFarmer = async (aadhaarHash: string) => {
  const contract = getReadContract();

  const farmer = await contract.getFarmer(aadhaarHash);

  return {
    name: farmer[0],
    fertilizerKg: Number(farmer[1]),
    claimed: farmer[2],
  };
};

/**
 * Returns complete farmer details.
 */
export const getFarmerFull = async (aadhaarHash: string) => {
  const contract = getReadContract();

  const farmer = await contract.getFarmerFull(aadhaarHash);

  return {
  name: farmer[0],
  location: farmer[1],
  fertilizerKg: Number(farmer[2]),
  claimed: farmer[3],
  claimTime: Number(farmer[4]),
  dealer: farmer[5],
};
};

/**
 * Checks whether a farmer exists.
 */
export const farmerExists = async (aadhaarHash: string) => {
  const contract = getReadContract();

  return await contract.farmerExists(aadhaarHash);
};



/**
 * Returns total farmer count.
 */
export const getFarmerCount = async (): Promise<number> => {
  const contract = getReadContract();

  const count = await contract.getFarmerCount();

  return Number(count);
};

/**
 * Returns Aadhaar hash by index.
 */
export const getFarmerByIndex = async (
  index: number
): Promise<string> => {
  const contract = getReadContract();

  return await contract.getFarmerByIndex(index);
};

/**
 * Returns contract owner.
 */
export const getOwner = async (): Promise<string> => {
  const contract = getReadContract();

  return await contract.owner();
};

/**
 * Returns total registered farmers.
 */
export const getTotalFarmers = async (): Promise<number> => {
  const contract = getReadContract();

  const total = await contract.totalFarmers();

  return Number(total);
};

/**
 * Returns total claimed farmers.
 */
export const getTotalClaimed = async (): Promise<number> => {
  const contract = getReadContract();

  const total = await contract.totalClaimed();

  return Number(total);
};

export const getAllFarmers = async () => {
  const contract = getReadContract();

  const count = Number(await contract.getFarmerCount());

  const farmers = [];

  for (let i = 0; i < count; i++) {
    const aadhaarHash = await contract.getFarmerByIndex(i);

    const farmer = await contract.getFarmerFull(aadhaarHash);

    farmers.push({
      aadhaarHash,
      name: farmer[0],
      location: farmer[1],
      fertilizerKg: Number(farmer[2]),
      claimed: farmer[3],
      claimTime: Number(farmer[4]),
      dealer: farmer[5],
    });
  }

  return farmers;
};

export const getFarmerByAadhaar = async (aadhaar: string) => {
  const contract = getReadContract();

  const aadhaarHash = ethers.keccak256(
    ethers.toUtf8Bytes(aadhaar)
  );

  const exists = await contract.farmerExists(aadhaarHash);

  if (!exists) {
    return null;
  }

  const farmer = await contract.getFarmerFull(aadhaarHash);

  return {
    aadhaarHash,
    name: farmer[0],
    location: farmer[1],
    fertilizerKg: Number(farmer[2]),
    claimed: farmer[3],
    claimTime: Number(farmer[4]),
    dealer: farmer[5],
  };
};

export const claimFertilizer = async (aadhaar: string) => {
  const contract = await getWriteContract();

  const aadhaarHash = ethers.keccak256(
    ethers.toUtf8Bytes(aadhaar)
  );

  const tx = await contract.claimFertilizer(aadhaarHash);

  await tx.wait();
};