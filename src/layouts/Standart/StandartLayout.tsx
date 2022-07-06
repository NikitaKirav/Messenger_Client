/** Absolute imports */
import React from 'react';

/** Ant design */
import { Layout } from 'antd';

/** Components */
import { Header } from '../../components/Header/Header';
import { LeftMenu } from '../../components/LeftMenu/LeftMenu';
import { Footer } from '../../components/Footer/Footer';

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
            <Header />
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