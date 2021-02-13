import Karyawan from './pages/karyawan';
import tambahKaryawan from './pages/tambahKaryawan';
import editKaryawan from './pages/editKaryawan';

const routes = [
  {
    path: '/',
    component: Karyawan,
    exact: true,
  },
  {
    path: '/add',
    component: tambahKaryawan,
  },
  {
    path: '/update/:id',
    component: editKaryawan,
  },
];

export default routes;
