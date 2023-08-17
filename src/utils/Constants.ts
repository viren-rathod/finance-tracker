export const columnTitles = [
  {
    id: 1,
    title: "Date",
    label: "tDate",
  },
  {
    id: 2,
    title: "Month",
    label: "monthYear",
  },
  {
    id: 3,
    title: "Type",
    label: "transactionType",
  },
  {
    id: 4,
    title: "Transfer from",
    label: "fromAccount",
  },

  {
    id: 5,
    title: "Transfer to",
    label: "toAccount",
  },

  {
    id: 6,
    title: "Amount",
    label: "amount",
  },
  {
    id: 7,
    title: "Receipt",
    label: "receipt",
  },
  {
    id: 8,
    title: "Notes",
    label: "notes",
  },
];

const months = [
  { id: "1", label: "Jan 2023" },
  { id: "2", label: "Feb 2023" },
  { id: "3", label: "Mar 2023" },
  { id: "4", label: "Apr 2023" },
  { id: "5", label: "May 2023" },
  { id: "6", label: "Jun 2023" },
  { id: "7", label: "Jul 2023" },
  { id: "8", label: "Aug 2023" },
  { id: "9", label: "Sept 2023" },
  { id: "10", label: "Oct 2023" },
  { id: "11", label: "Nov 2023" },
  { id: "12", label: "Dec 2023" },
];

const transactionTypes = [
  { id: "1", label: "Home Expense" },
  { id: "2", label: "Personal Expense" },
  { id: "3", label: "Income" },
];

const accounts = [
  { id: "1", label: "Personal Account", value: "personalAccount" },
  { id: "2", label: "Real Living", value: "realLiving" },
  { id: "3", label: "My Dream Home", value: "myDreamHome" },
  { id: "4", label: "Full Circle", value: "fullCircle" },
  { id: "5", label: "Core Realtors", value: "coreRealtors" },
  { id: "6", label: "Big Block", value: "bigBlock" },
];

export { months, transactionTypes, accounts };
