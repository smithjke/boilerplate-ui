import React, { useEffect } from 'react';

// function field(lol: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     console.log('field lol >>>', lol);
//     console.log('field target >>>', target);
//     console.log('field propertyKey >>>', propertyKey);
//     console.log('field descriptor >>>', descriptor);
//   };
// }

export class TestData {
  id: string;

  firstName: string;

  lastName: string;

  createdAt: Date;
}

const testDataParser: Record<keyof TestData, [string, string]> = {
  id: ['aaa', 'bbb'],
  firstName: ['aaa', 'bbb'],
  lastName: ['aaa', 'bbb'],
  createdAt: ['aaa', 'bbb'],
};

console.log('testDataParser >>>', testDataParser);

function mapField(field: any): any {
  if (typeof field === 'number') {
    return Number(field);
  }

  if (typeof field === 'object' && field instanceof Date) {
    return field.toISOString();
  }

  return String(field);
}

function toRaw(data: object): object {
  const rawData = {};

  Object.keys(data).forEach((key) => {
    const snakeKey = key
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .toLowerCase()
      .split(' ')
      .join('_');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rawData[snakeKey] = mapField(data[key]);
  });

  return rawData;
}

export const TestDecorator: React.FC = () => {
  const num = 1;

  useEffect(() => {
    const testData = new TestData();

    testData.id = 'abc';
    testData.firstName = 'Harold';
    testData.lastName = 'Smith';
    testData.createdAt = new Date('2022-02-28T12:00:00.000Z');

    const rawData = toRaw(testData);

    console.log('testData >>>', testData);
    console.log('rawData >>>', rawData);
    // const jsonTestData = JSON.stringify(testData);
    // console.log('jsonTestData >>>', jsonTestData);
  }, []);

  return (
    <div>
      TEST DECORATOR {num}
    </div>
  );
};
