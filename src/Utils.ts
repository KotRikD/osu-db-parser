/**
 * Converts raw .NET's dateData to Date object
 *
 *  @param {number} dateDataHi Raw .NET internal ticks high-order number
 *  @param {number} dateDataLo Raw .NET internal ticks low-order number
 *  @returns {Date} Local timezone Date
 */
export const netDateBinaryToDate = (
    dateDataHi: number,
    dateDataLo: number
): Date => {
    const buffer = Buffer.alloc(8);

    const ticksMask = 0x3fffffff;

    dateDataHi &= ticksMask;

    buffer.writeInt32LE(dateDataLo);
    buffer.writeInt32LE(dateDataHi, 4);

    const dateData = buffer.readBigInt64LE();

    const ticksPerMillisecond = 10000n;
    const epochTicks = 621355968000000000n;
    const milliseconds = (dateData - epochTicks) / ticksPerMillisecond;

    return new Date(Number(milliseconds));
};