/** Absolute imports */
import React from 'react';

/** Ant design */
import { Layout } from 'antd';

/** Components */
import { LeftMenu } from '../../components/LeftMenu/LeftMenu';
import { Footer } from '../../components/Footer/Footer';
import { HeaderContainer } from '../../components/Header/HeaderContainer';

/** Style */
import classes from './styles.module.scss';



const { Content } = Layout;

interface Props { 
    component: any;
    // All other props
    [x:string]: any;
  };

export const StandartLayout: React.FC<Props>  = ({component: Component, ...rest}) => {

    return (
        <Layout className={classes.content}>
            <HeaderContainer />
            <Content className={classes.contentBlock}>
                <Layout className={classes.layoutInfo}>
                    <LeftMenu className={classes.leftMenu} />
                    <Content className={classes.mainPart}>
                        <Component {...rest} />
                    </Content>
                </Layout>
            </Content>
            <Footer footerLongStyle={classes.footerLong} footerShortStyle={classes.footerShort} />
        </Layout>
    );
}