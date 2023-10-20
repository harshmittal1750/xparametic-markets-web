import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

interface FilterCategory {
  id: string;
  name: string;
  values: string[];
}

const filterCategories: FilterCategory[] = [
  {
    id: "state",
    name: "State",
    values: ["Open", "Close", "Resolved"],
  },
  {
    id: "price",
    name: "Price",
    values: ["0$-50$", "50$-100$", "100$-1000$"],
  },
  {
    id: "category",
    name: "Category",
    values: ["Technology", "Politics", "Crypto"],
  },
];

const StyledListItemButton = styled(ListItemButton)({
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  transition: "all 0.2s ease-in-out",
});

const FilterList: React.FC = () => {
  const [openedCategories, setOpenedCategories] = React.useState<
    Record<string, boolean>
  >({});
  const [selectedValues, setSelectedValues] = React.useState<
    Record<string, string>
  >({});
  const [listOpen, setListOpen] = React.useState(false);

  const handleToggle = (id: string) => {
    setOpenedCategories((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleRadioChange = (category: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [category]: value }));
  };

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ px: 2 }}
        onClick={toggleList}
        startIcon={<FilterListIcon />}
      >
        filter
      </Button>
      <Slide direction="right" in={listOpen} mountOnEnter unmountOnExit>
        <List
          sx={{
            width: "100%",
            maxWidth: 500,
            // border: 1,
            // borderColor: "#000000",
            boxShadow: 1,
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {filterCategories.map(({ id, name, values }) => (
            <React.Fragment key={id}>
              <StyledListItemButton onClick={() => handleToggle(id)}>
                <ListItemText primary={name} />
                {openedCategories[id] ? <ExpandLess /> : <ExpandMore />}
              </StyledListItemButton>
              <Collapse
                in={openedCategories[id]}
                timeout="auto"
                unmountOnExit
                // sx={{ boxShadow: 1 }}
              >
                <List component="div" disablePadding>
                  {values.map((value) => (
                    <StyledListItemButton
                      key={value}
                      onClick={() => handleRadioChange(id, value)}
                    >
                      {<Radio checked={selectedValues[id] === value} />}
                      <ListItemText primary={value} />
                    </StyledListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Slide>
    </>
  );
};

export default FilterList;
