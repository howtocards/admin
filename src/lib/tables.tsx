import * as React from 'react';
import { Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

type FilterDropdown = {
  setSelectedKeys: (keys: string[]) => string;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
};

export const addColumnSearch = (dataIndex: string, ref: any) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
  }: FilterDropdown) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={ref}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={confirm}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={confirm}
        icon="search"
        size="small"
        style={{ width: 188, marginRight: 8 }}
      >
        Search
      </Button>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  render: (text: string) => {
    return (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069' }}
        searchWords={[ref.current.props.value]}
        autoEscape
        textToHighlight={text && text.toString()}
      />
    );
  },
});
