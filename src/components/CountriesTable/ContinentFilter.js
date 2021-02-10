import React, { useState } from 'react';
import {
  EuiPopover,
  EuiFilterSelectItem,
  EuiFilterGroup,
  EuiFilterButton,
} from '@elastic/eui';

export default function ContinentFilter({ items, isLoading, onChange }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const button = (
    <EuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={items.length}
      isLoading={isLoading}
    >
      {activeItem || 'Filter by Continent'}
    </EuiFilterButton>
  );

  const onItemClick = (item) => () => {
    setActiveItem(item);
    onChange(item);
    setIsPopoverOpen(false);
  };

  return (
    <EuiFilterGroup>
      <EuiPopover
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
      >
        <div>
          <EuiFilterSelectItem
            checked={!activeItem ? 'on' : undefined}
            onClick={onItemClick('')}
          >
            None
          </EuiFilterSelectItem>
          {items.map((item) => (
            <EuiFilterSelectItem
              checked={activeItem === item ? 'on' : undefined}
              key={item}
              onClick={onItemClick(item)}
            >
              {item}
            </EuiFilterSelectItem>
          ))}
        </div>
      </EuiPopover>
    </EuiFilterGroup>
  );
}
