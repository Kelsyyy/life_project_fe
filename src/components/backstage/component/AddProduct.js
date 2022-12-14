import React, { useState } from 'react';
import '../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { FiShoppingBag } from 'react-icons/fi';
import AddImgProduct from './AddImgProduct';
import AddImgProduct2 from './AddImgProduct2';
import AddImgProduct3 from './AddImgProduct3';
import AddImgProduct4 from './AddImgProduct4';

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import Notification from '../../activity/Notification';
import { useEffect } from 'react';
function AddPage({
  setAddPage,
  loading,
  setLoading,
  lastPage,
  setPageNow,
  setLoginBtn,
  user,
}) {
  const [errMsg, setErrMsg] = useState(false);
  // const [loginBtn, setLoginBtn] = useState(false);
  const [cateArr, setCateArr] = useState([]);

  const [product, setProduct] = useState({});
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/category`);
      setCateArr(result.data);
    })();
  }, []);
  function handleChange(e) {
    const newProduct = { ...product, [e.target.name]: e.target.value };

    setProduct(newProduct);
  }
  // let brand = 11;
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('cate', product.cate);
      formData.append('brand', user);
      formData.append('color', product.color);
      formData.append('intro', product.intro);
      formData.append('spec', product.spec);
      formData.append('inventory', product.inventory);
      formData.append('photo1', product.photo1);
      formData.append('photo1', product.photo2);
      formData.append('photo1', product.photo3);
      formData.append('photo1', product.photo4);
      let response = await axios.post(
        `${API_URL}/products/addProduct`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.message === '??????????????????') {
        setErrMsg(true);
        setTimeout(() => {
          setErrMsg(false);
        }, 2000);
      } else {
        setLoading(!loading);
        setLoginBtn('add');
        setTimeout(() => {
          setPageNow(lastPage);
        }, 1000);
        setTimeout(() => {
          setLoginBtn('');
        }, 2000);
        setTimeout(() => {
          setAddPage(false);
        }, 600);
      }
    } catch (e) {
      console.error('addProduct', e);
    }
  }

  return (
    <>
      {errMsg ? (
        <Notification contaninText="??????????????????">
          <FiShoppingBag />
        </Notification>
      ) : (
        ''
      )}

      <div className="backstageAddPage">
        <form className="formContainer">
          <IconContext.Provider
            value={{ color: '#817161', size: '2em', className: 'closeIcon' }}
          >
            <IoCloseSharp
              onClick={() => {
                setAddPage(false);
              }}
            />
          </IconContext.Provider>

          <div className="pageTitle">
            <p
              onClick={(e) => {
                e.preventDefault();
                setProduct({
                  name: '??????????????????1',
                  cate: 8,
                  color: '?????????',
                  inventory: 20,
                  price: 4980,
                  intro:
                    '??????????????????,???????????????????????????26cm,?????????????????????4????????????,??????????????????????????????:??????/??????/??????????????????????????????????????????',
                  spec: '???????????????W35 x D37 x H22.5 cm/???????????????W28 x D26 x H8 cm/?????????4.8kg/?????????110V???60Hz/?????????AC ?????????/???????????????- ??? ???????????? ????????? ??? ?????? ???-?????????/???????????????????????????????????????????????????(?????????)???????????????????????????????????????(????????????)',
                  photo1: '',
                  photo2: '',
                  photo3: '',
                });
              }}
            >
              ????????????
            </p>
            {/* <button className="hideBtn"></button> */}
          </div>
          <div className="grid">
            {/* title place lat */}
            <div className="d-flex flex-column align-items-end">
              <div className="mb-4">
                <label>???????????????</label>
                <input
                  className="input"
                  id="name"
                  name="name"
                  type="text"
                  maxLength={15}
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label>???????????????</label>
                <select className="input m-0" onChange={handleChange}>
                  {cateArr.map((v, i) => {
                    return (
                      <option value={v.id} key={v.id}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label>?????????</label>
                <input
                  className="input"
                  id="color"
                  name="color"
                  type="text"
                  maxLength={10}
                  value={product.color}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* price pepCount lng */}
            <div className="">
              <div className="mb-4">
                <label>?????????</label>
                <input
                  className="input"
                  id="inventory"
                  name="inventory"
                  type="number"
                  maxLength={10}
                  value={product.inventory}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>?????????</label>
                <input
                  className="input"
                  id="price"
                  name="price"
                  type="number"
                  maxLength={10}
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* int */}
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">???????????????</label>
            <textarea
              className="textContent "
              placeholder="???150???"
              id="intro"
              name="intro"
              rows="5"
              cols="68"
              maxLength={150}
              value={product.intro}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">???????????????</label>
            <textarea
              className="textContent"
              placeholder="???200???"
              id="spec"
              name="spec"
              rows="5"
              cols="68"
              maxLength={200}
              value={product.spec}
              onChange={handleChange}
            />
          </div>

          {/* img */}
          <div className="mb-4 leftInput">???????????????</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <AddImgProduct product={product} setProduct={setProduct} />
            <AddImgProduct2 product={product} setProduct={setProduct} />
            <AddImgProduct3 product={product} setProduct={setProduct} />
            {/* {[...Array(3)].map((v, i) => {
              return (
                
              );
            })} */}
          </div>
          <div className="mb-4 leftInput">?????????????????????</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <AddImgProduct4 product={product} setProduct={setProduct} />
          </div>
          {/* btn */}
          <div className="mt-5 mb-4 text-center">
            <button className="addBtn" type="submit" onClick={handleSubmit}>
              ??????
            </button>
            <button
              className="cancelBtn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setAddPage(false);
              }}
            >
              ??????
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPage;
