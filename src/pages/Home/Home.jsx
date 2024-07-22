import { useEffect, useState } from 'react';
import { fetchContact } from '../../api/fetchApi';
import { useParams } from 'react-router-dom';
import { Desktop, Mobile } from '../../components/responsive/Responsive';
import ContactCard from '../../components/ui/ContactCard/ContactCard';
import ListCard from '../../components/ui/ListCard/ListCard';
import ContactTableWrapper from '../../components/ui/ContactTableWrapper/ContactTableWrapper';

export const Home = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (searchValue) {
            const fetchData = async () => {
                try {
                    const response = await fetchContact();
                    setData(response.data);
                } catch (error) {
                    console.log(error)
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const response = await fetchContact(page);
                setData(response.data);
            };
            fetchData();
        }
    }, [searchValue, page]);

    const filteredData = data?.filter(contact =>
        contact.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div >
            <Desktop>
                <div className="flex">
                    <ContactTableWrapper
                        page={page}
                        setPage={setPage}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    >
                        <ListCard data={filteredData} />
                    </ContactTableWrapper>
                    {id && <ContactCard id={id} />}
                </div>
            </Desktop>
            <Mobile>
                {id ? (
                    <ContactCard id={id} />
                ) : (
                    <ContactTableWrapper
                        page={page}
                        setPage={setPage}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    >
                        <ListCard data={filteredData} />
                    </ContactTableWrapper>
                )}
            </Mobile>
        </div>
    );
};