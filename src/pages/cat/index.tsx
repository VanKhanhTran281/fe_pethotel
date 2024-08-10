import { ArrowRightOutlined, FilterOutlined } from '@ant-design/icons/lib/icons'
import { Select, Space } from 'antd'
import { useState } from 'react';
// import DropDown from '../../services/service/function/dropdown';
// import { datadropdown } from '../../services/service/data/data_dropdown';
import FilterPrice from '../../services/service/function/filter_price';
import ProductCat from './product';
const sortData = {
    sort: ['Mới nhất', 'Cũ nhất', 'Giá: Giảm dần', 'Giá: Tăng dần']
};

type SortName = keyof typeof sortData;
const provinceData: SortName[] = ['sort'];
const Dog: React.FC = () => {
    const [sort, setSort] = useState(sortData[provinceData[0] as SortName]);
    const [secondSort, setSecondSort] = useState(sortData[provinceData[0]][0] as SortName);
    const onSecondSortChange = (value: SortName) => {
        setSecondSort(value);
    };
    const [sizeFilterS, setSizeFilterS] = useState<string | null>(null);
    const [sizeFilterM, setSizeFilterM] = useState<string | null>(null);
    const [sizeFilterL, setSizeFilterL] = useState<string | null>(null);
    const [sizeFilterXL, setSizeFilterXL] = useState<string | null>(null);
    const [fromPrice, setFromPrice] = useState<number | null>(null);
    const [toPrice, setToPrice] = useState<number | null>(null);
    const handleFilter = () => {
        const fromPriceValue = parseFloat(
            (document.getElementById('from-price') as HTMLInputElement)?.value || '1'
        );
        const toPriceValue = parseFloat(
            (document.getElementById('to-price') as HTMLInputElement)?.value || '8000000'
        );
        setFromPrice(fromPriceValue);
        setToPrice(toPriceValue);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '1450px', height: '1200px', marginTop: '20px' }}>
                <div>
                    <img src="/img/slider2.jpg" alt="" style={{ width: '1450px', height: '300px' }} />
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '1350px' }}>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div style={{ width: '307px', height: '700px', border: '1px solid #dee2e6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <FilterOutlined style={{ fontSize: '25px' }} />
                                    <p style={{ fontSize: '20px', fontWeight: '600' }}>Bộ lọc tìm kiếm</p>
                                </div>
                                <fieldset style={{ border: 'none' }}>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <legend style={{ fontSize: '17px' }}>Lọc theo size</legend>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterS(sizeFilterS === 'S' ? null : 'S')} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size S</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterM(sizeFilterM === 'M' ? null : 'M')} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size M</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterL(sizeFilterL === 'L' ? null : 'L')}
                                                        style={{ backgroundColor: sizeFilterL === 'L' ? 'blue' : 'white' }} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size L</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterXL(sizeFilterXL === 'XL' ? null : 'XL')}
                                                        style={{ backgroundColor: sizeFilterXL === 'XL' ? 'blue' : 'white' }} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size XL</span>
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset style={{ border: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                                    <div>Tìm kiếm theo giá:</div>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button style={{ backgroundColor: '#B3AE41', border: 'none' }}>Từ</button>
                                            <input type="text" id="from-price" style={{ width: '70px', outline: 'none' }} />
                                        </div>
                                        <ArrowRightOutlined />
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button style={{ backgroundColor: '#B3AE41', border: 'none' }}>Đến</button>
                                            <input type="text" id="to-price" style={{ width: '70px', outline: 'none' }} />
                                        </div>
                                    </div>
                                    <button style={{ backgroundColor: '#B3AE41', width: '260px', height: '25px', outline: 'none', border: 'none' }} onClick={handleFilter}>LỌC</button>
                                </fieldset>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div style={{ height: '36px', width: '1020px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ fontSize: '36px', fontWeight: '700' }}>Khách sạn dành cho mèo</p>
                                    {/* <div style={{display:'flex',gap:'5px'}}>
                                        <p style={{fontSize:'19px'}}>Hiện theo</p>
                                        <DownOutlined style={{fontSize:'15px',marginTop:'5px'}}/>
                                    </div> */}
                                    <Space wrap>
                                        <Select
                                            style={{ width: 120 }}
                                            value={secondSort}
                                            onChange={onSecondSortChange}
                                            options={sort.map((s) => ({ label: s, value: s }))}

                                        />
                                    </Space>
                                </div>
                                <div>
                                    <ProductCat
                                        fromPrice={fromPrice}
                                        toPrice={toPrice}
                                        sizeFilterS={sizeFilterS}
                                        sizeFilterM={sizeFilterM}
                                        sizeFilterL={sizeFilterL}
                                        sizeFilterXL={sizeFilterXL}
                                    />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dog