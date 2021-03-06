import {React, Component, useState, createRef, useEffect} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HappinessGraph({data}) {
    return (
        <BarChart
        width={300}
        height={250}
        data={data}
        margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5
        }}
        >
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Happiness" fill="#805AD5" />
        </BarChart>
      );
  }