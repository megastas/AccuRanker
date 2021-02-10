import React, { useMemo, useRef, useState } from 'react';
import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiGlobalToastList,
  EuiPanel,
} from '@elastic/eui';
import useCountries from '../../data/useCountries';
import ContinentFilter from './ContinentFilter';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { sortingCompareFunction, filteringCompareFunction, onScroll } from '../../services/table';
import { uniq } from '../../services/utils';
import styles from './countriesTable.module.scss';

const fieldsMap = {
  Name: 'name',
  Code: 'code',
  Continent: 'continent',
};

const STEP = 30;

export default function CountriesTable() {
  const { data, loading, error } = useCountries();
  const [sortBy, setSortBy] = useState({ field: fieldsMap.Name, asc: true });
  const [search, setSearch] = useState('');
  const [visibleItemsAmount, setVisibleItemsAmount] = useState(STEP);
  const [continentFilter, setContinentFilter] = useState();
  const continents = useMemo(() => uniq(data.map((i) => i.continent)), [data]);
  const tableWrapperRef = useRef();

  const scrollToTop = () => {
    tableWrapperRef.current.scrollTop = 0;
    setVisibleItemsAmount(STEP);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    scrollToTop();
  };

  const onSort = (field) => {
    setSortBy({ field, asc: sortBy.field === field ? !sortBy.asc : true });
    scrollToTop();
  };

  if (error) {
    return (
      <EuiGlobalToastList
        toasts={[
          {
            id: 1,
            title: "Couldn't complete the fetch of data",
            color: 'danger',
            iconType: 'alert',
          },
        ]}
        toastLifeTimeMs={6000}
      />
    );
  }

  return (
    <EuiPanel paddingSize="m">
      <EuiFlexGroup gutterSize="m">
        <EuiFlexItem className={styles.title} grow={false}><h2>Countries</h2></EuiFlexItem>
        <EuiFlexItem>
          <EuiFieldSearch
            isLoading={loading}
            placeholder="Search countries"
            clearable="true"
            value={search}
            onChange={onSearch}
            fullWidth
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ width: 200 }} grow={false}>
          <ContinentFilter
            onChange={(value) => setContinentFilter(value)}
            isLoading={loading}
            items={continents}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      {loading ? <div className={styles.spinner}><EuiLoadingSpinner size="xl" /></div>
        : (
          <div
            ref={tableWrapperRef}
            onScroll={onScroll(() => setVisibleItemsAmount(visibleItemsAmount + STEP))}
            className={styles.tableWrapper}
          >
            <EuiTable id="exampleId">
              <TableHeader fieldsMap={fieldsMap} onSort={onSort} sortBy={sortBy} />
              <EuiTableBody>
                {data
                  .filter((i) => (continentFilter ? i.continent === continentFilter : true))
                  .filter(filteringCompareFunction(search))
                  .sort(sortingCompareFunction(sortBy.field, sortBy.asc))
                  .slice(0, visibleItemsAmount)
                  .map((item) => <TableRow key={item.code} search={search} item={item} />)}
              </EuiTableBody>
            </EuiTable>
          </div>
        )}
    </EuiPanel>
  );
}
