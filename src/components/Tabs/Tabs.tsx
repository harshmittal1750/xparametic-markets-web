import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  Children
} from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

import Divider from '../Divider';

const ActiveTabContext = createContext({});

function getChildrenTabs(children): { name: string; id: string }[] {
  return Children.map(children, child => {
    if (!isNull(child)) {
      return {
        name: child.props.tab,
        id: child.props.id
      };
    }

    return child;
  }).filter(child => !isNull(child));
}

type TabPaneProps = {
  /**
   * Name of the tab pane
   */
  tab: string;
  /**
   * Id of the tab pane
   */
  id: string;
  children?: ReactNode;
};

function TabPane({ tab, id, children }: TabPaneProps) {
  const activeTab = useContext(ActiveTabContext);

  if (activeTab !== id || !tab) return null;

  return <>{children}</>;
}

type TabsProps = {
  /**
   * Direction of the tabs items
   * @default 'row'
   */
  direction?: 'row' | 'column';
  /**
   * Id of the default active tab pane
   */
  defaultActiveId?: string;
  /**
   * Custom filter component
   */
  filters?: ReactNode[];
  fullwidth?: boolean;
  children?: ReactNode;
};

/**
 * Tabs to switch between different views
 */
function Tabs({
  direction = 'row',
  defaultActiveId,
  filters,
  fullwidth,
  children
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

  const tabs = useMemo(() => getChildrenTabs(children), [children]);

  useEffect(() => {
    setActiveTab(defaultActiveId);
  }, [defaultActiveId]);

  if (!activeTab || !children) return null;

  return (
    <div className={classNames({ 'pm-c-tabs': true, 'width-full': fullwidth })}>
      <div className="pm-c-tabs__header">
        <ul className={`pm-c-tabs__list--${direction}`}>
          {tabs?.map((tab, index) => (
            <li
              key={tab.id}
              tabIndex={index}
              className={classNames({
                'pm-c-tabs__item': true,
                active: activeTab === tab.id
              })}
            >
              <button
                type="button"
                name={tab.name}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
        {!isUndefined(filters) && !isEmpty(filters) ? (
          <ul className="pm-c-tabs__filters">
            {filters.map((filter, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {filter}
                <Divider variant="circle" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <ActiveTabContext.Provider value={activeTab}>
        <div className="pm-c-tabs__content">{children}</div>
      </ActiveTabContext.Provider>
    </div>
  );
}

Tabs.displayName = 'Tabs';

Tabs.TabPane = TabPane;

export default Tabs;
