import React from 'react';
import BackstageHeader from '../public_component/BackstageHeader';
import PaginationBar from '../public_component/PaginationBar';
import '../../styles/backstage/_backstageProduct.scss';
import { IconContext } from 'react-icons';
import { BsPencilSquare } from 'react-icons/bs';
import { TbDiscount2 } from 'react-icons/tb';
import { FaTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../utils/config';
import AddProduct from './component/AddProduct';
import AddDiscount from './component/AddDiscount';
import Discount from './component/Discount';
import UpdateProduct from './component/UpdateProduct';
import Notification from '../activity/Notification';
import { useUserRights } from '../../usecontext/UserRights';

function Backstage() {
  const [productsData, setProductsData] = useState([]);
  const [productData, setProductData] = useState({});
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [addPage, setAddPage] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [discountPage, setDiscountPage] = useState(false);
  const [addDiscountPage, setAddDiscountPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState('');
  const [loginBtn, setLoginBtn] = useState('');
  const { user } = useUserRights();
  const [discountData, setDiscountData] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products/backstage?page=${pageNow}&brand=${user.company} `,
        {
          withCredentials: true,
        }
      );
      let discountResult = await axios.get(
        `${API_URL}/products/discount?company=${user.company} `,
        {
          // withCredentials: true,
        }
      );
      setDiscountData(discountResult.data);
      setTotal(result.data.pagination.total);
      setProductsData(result.data.data);
      setLastPage(result.data.pagination.lastPage);
    })();
  }, [pageNow, lastPage, productData, loading, total, user]);
  const handleDelete = async (id) => {
    let response = await axios.put(
      `${API_URL}/products/deleteProduct?id=${id}`
    );
  };

  return (
    <>
      <BackstageHeader />
      {addPage ? (
        <AddProduct
          setAddPage={setAddPage}
          loading={loading}
          setLoading={setLoading}
          lastPage={lastPage}
          setPageNow={setPageNow}
          setLoginBtn={setLoginBtn}
          user={user.company}
        />
      ) : (
        ''
      )}
      {updatePage ? (
        <UpdateProduct
          setUpdatePage={setUpdatePage}
          productData={productData}
          loading={loading}
          setLoading={setLoading}
          setLoginBtn={setLoginBtn}
          user={user.company}
        />
      ) : (
        ''
      )}
      {discountPage ? (
        <Discount
          discountData={discountData}
          setDiscountPage={setDiscountPage}
          loading={loading}
          setLoading={setLoading}
          setLoginBtn={setLoginBtn}
          user={user.company}
        />
      ) : (
        ''
      )}
      {addDiscountPage ? (
        <AddDiscount
          setAddDiscountPage={setAddDiscountPage}
          loading={loading}
          setLoading={setLoading}
          setLoginBtn={setLoginBtn}
          user={user.company}
        />
      ) : (
        ''
      )}
      {loginBtn === 'add' ? (
        <Notification
          // linkToText="???????????????"
          // linkTo="/backstage"
          contaninText="??????????????????"
          bottom={20}
        />
      ) : (
        ''
      )}
      {loginBtn === 'update' ? (
        <Notification
          // linkToText="???????????????"
          // linkTo="/products"
          contaninText="??????????????????"
          bottom={20}
        />
      ) : (
        ''
      )}
      {loginBtn === 'delete' ? (
        <Notification
          // linkToText="???????????????"
          // linkTo="/products"
          contaninText="??????????????????"
          bottom={20}
        />
      ) : (
        ''
      )}
      {loginBtn === 'addDiscount' ? (
        <Notification
          // linkToText="???????????????"
          // linkTo="/backstage"
          contaninText="??????????????????"
          bottom={20}
        />
      ) : (
        ''
      )}
      {loginBtn === 'deleteDiscount' ? (
        <Notification
          // linkToText="???????????????"
          // linkTo="/products"
          contaninText="??????????????????"
          bottom={20}
        />
      ) : (
        ''
      )}
      <IconContext.Provider
        value={{ color: '#817161', size: '1.5em', className: 'icons' }}
      >
        <div className="backstageContainer">
          <button
            className="addBtn"
            onClick={(e) => {
              e.preventDefault();
              setAddPage(true);
            }}
          >
            ????????????
          </button>
          <div
            className="discount"
            onClick={() => {
              setDiscountPage(true);
            }}
          >
            <IconContext.Provider
              value={{ color: '#1F9998', size: '2em', className: 'icons' }}
            >
              <TbDiscount2 />
            </IconContext.Provider>
          </div>
          <button
            className="addDiscount"
            onClick={(e) => {
              e.preventDefault();
              setAddDiscountPage(true);
            }}
          >
            ????????????
          </button>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>????????????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {productsData.map((v) => {
                let {
                  id,
                  name,
                  price,
                  inventory,
                  img,
                  intro,
                  spec,
                  valid,
                  color,
                  product_category_name,
                } = v;
                return (
                  <tr key={id}>
                    <td>
                      <div className="titleImg">
                        <img
                          src={`${API_URL_IMG}/product/product_img/${img}`}
                          alt="/"
                        />
                      </div>
                    </td>
                    <td>{name}</td>
                    <td>{product_category_name}</td>
                    <td>{inventory}</td>
                    <td className="text-center">{price}</td>
                    <td>{color}</td>
                    <td className="ellipsis">
                      <span>{intro}</span>
                    </td>
                    <td className="text-center ellipsis">
                      <span>{spec}</span>
                    </td>
                    <td>{valid === 1 ? '?????????' : '?????????'}</td>
                    <td>
                      <div
                        onClick={() => {
                          setUpdatePage(true);
                          setProductData(v);
                        }}
                      >
                        <BsPencilSquare />
                      </div>
                    </td>
                    <td
                      onClick={(e) => {
                        handleDelete(id);
                        setLoading(!loading);
                        setLoginBtn('delete');
                        setTimeout(() => {
                          setLoginBtn('');
                        }, 2000);
                      }}
                    >
                      <FaTrashAlt />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PaginationBar
            lastPage={lastPage}
            pageNow={pageNow}
            setPageNow={setPageNow}
          />
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Backstage;
