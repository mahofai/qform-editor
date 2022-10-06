const headers = [
  { key: 'id', label: 'ID' },
  { key: 'imgsrc', label: 'Image', type: 'q-list-body-row-cell-image' },
  { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Price' },
  { key: 'subTotal', label: 'subTotal', build: subTotal, sorter: subSorter() }
]

const footers = [
  { key: 'id', label: 'ID' },
  { key: 'imgsrc', label: 'Image', type: 'q-list-body-row-cell-image' },
  { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Price' },
  { key: 'subTotal', label: 'subTotal' }
]

const rows = [
  { id: 1, name: 'Chicken Wing', qty: 3, price: 10, imgsrc: 'https://questwork.com/wp-content/uploads/2017/07/questwork-logo.png' },
  { id: 2, name: 'Pizza', qty: 30, price: 50 },
  { id: 3, name: 'Hamburger', qty: 1, price: 12 },
  { id: 4, name: 'Long text - Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola Coca Cola ', qty: 2, price: 5 },
  { id: 5, name: 'Orange Juice', qty: 10, price: 15 },
  { id: 6, name: 'Potato Chips', qty: 1, price: 8 }
]

const headers2 = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', css: { element: 'q-list-header__cell--flex-4' } },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Price' },
  { key: 'subTotal', label: 'subTotal', build: subTotal, sorter: subSorter() }
]

const rows2 = rows.slice(0, 4)

function subTotal(row) {
  return row.qty * row.price
}

function subSorter() {
  let sortDir
  return (arr) => {
    sortDir = (typeof sortDir !== 'undefined') ? sortDir * -1 : 1
    arr.sort((a, b) => {
      return (a.qty * a.price < b.qty * b.price ? -1 : 1) * sortDir
    })
    return sortDir
  }
}

export default {
  headers,
  headers2,
  footers,
  rows,
  rows2
}
export {
  headers,
  headers2,
  footers,
  rows,
  rows2
}
