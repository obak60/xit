import Banner from "@/components/page-comp/home/banner";
import Categories from "@/components/page-comp/home/categories";
import Featured from "@/components/page-comp/home/featured";
import ServiceBenefits from "@/components/reusuable/service-benefits";
import { metadataConfig } from "@/config/metadataConfig";
import AdvPopup from "@/components/page-comp/home/adv-popup";
import Offers from "@/components/page-comp/home/offers";
import ConnectSec from "@/components/page-comp/home/connect-sec";
import DynamicSections from "@/components/page-comp/home/dynamic-sections";
import StaticSections from "@/components/page-comp/home/static-sections";

export const metadata = metadataConfig.home;

const HomePage = () => {


  return (
    <div>
      
      {/* <AdvPopup /> */}

     <Banner />

      <div className="section-padding">
        <Categories />
      </div>

      <div>
        <Featured />
      </div>


      <div>
        <StaticSections />
      </div>

      <div className="section-padding">
        <DynamicSections />
      </div>
      <div className="section-padding">
        <Offers />
      </div>

      <div className="section-padding !pb-0">
        <ConnectSec />
      </div>
      <div className="section-padding !pt-0">
        <ServiceBenefits />
      </div> 

    </div>
  );
};

export default HomePage;