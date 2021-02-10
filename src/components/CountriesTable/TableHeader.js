import React from 'react';
import { EuiTableHeader, EuiTableHeaderCell } from '@elastic/eui';

export default function TableHeader({ sortBy, onSort, fieldsMap }) {
  return (
    <EuiTableHeader>
      {Object.keys(fieldsMap).map((i) => (
        <EuiTableHeaderCell
          key={fieldsMap[i]}
          isSorted={sortBy.field === fieldsMap[i]}
          isSortAscending={sortBy.asc}
          onSort={() => onSort(fieldsMap[i])}
        >
          {i}
        </EuiTableHeaderCell>
      ))}
    </EuiTableHeader>
  );
}
