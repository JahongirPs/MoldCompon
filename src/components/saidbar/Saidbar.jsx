import "./Aside.scss";
import {instance } from "../../api/axios";
import React, { useEffect, useState } from "react";
import {AiOutlineAppstore} from "react-icons/ai";
import {FiChevronRight} from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const delet = ["/login" , "/product-view" , "/admin"]


const Aside = () => {

    const currentLangueTranslate = useSelector(
			state => state.langueageTarnslate.lang
		)


  const [categoryData, setCategoryData] = useState([])
  let location = useLocation()   

  useEffect(() => {
    instance("/category/category-nest")
      .then(response => setCategoryData(response?.data))
      .catch(err => console.log(err))
  }, [])

 
  return delet.includes(location.pathname) ? (
		<></>
	) : (
		<div className='aside'>
			<p className='aside__header'>
				<AiOutlineAppstore />
				Category
			</p>
			<ul className='aside__menu'>
				{currentLangueTranslate === 'uz'
					? categoryData.mainCategory_uz?.map((mainCategoryItem, ind) => (
							<li key={uuidv4()} className='aside__menu-item'>
								<Link to={`/maincategory/${mainCategoryItem}`}>
									{mainCategoryItem}
								</Link>{' '}
								<FiChevronRight />
								<div className='sub-category-item'>
									{categoryData.productSubCategories_ru[ind].map(
										subCategoryItem =>
											subCategoryItem ? (
												<Link
													to={`/subcategory/${subCategoryItem}`}
													key={uuidv4()}
												>
													{subCategoryItem}
												</Link>
											) : (
												<React.Fragment key={uuidv4()}></React.Fragment>
											)
									)}
								</div>
							</li>
					  ))
					: categoryData.mainCategory_ru?.map((mainCategoryItem, ind) => (
							<li key={uuidv4()} className='aside__menu-item'>
								<Link to={`/maincategory/${mainCategoryItem}`}>
									{mainCategoryItem}
								</Link>{' '}
								<FiChevronRight />
								<div className='sub-category-item'>
									{categoryData.productSubCategories_ru[ind].map(
										subCategoryItem =>
											subCategoryItem ? (
												<Link
													to={`/subcategory/${subCategoryItem}`}
													key={uuidv4()}
												>
													{subCategoryItem}
												</Link>
											) : (
												<React.Fragment key={uuidv4()}></React.Fragment>
											)
									)}
								</div>
							</li>
					  ))}
			</ul>
		</div>
	)
}

export default Aside
