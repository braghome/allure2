import './styles.css';
import {on, className} from '../../decorators';
import settings from '../../util/settings';
import template from './NodeSorterView.hbs';
import {View} from 'backbone.marionette';

const AVAILABLE_SORTERS = ['sorter.name', 'sorter.duration', 'sorter.status'];

@className('sorter')
class NodeSorterView extends View {
    template = template;

    initialize({sorterSettingsKey}) {
        this.sorterSettingsKey = sorterSettingsKey;
    }

    @on('click .sorter__item')
    onChangeSorting(e) {
        const el = this.$(e.currentTarget);

        settings.save(this.sorterSettingsKey, {
            sorter: el.data('name'),
            ascending: !el.data('asc')
        });

        const ascending = el.data('asc');
        this.$('.sorter_enabled').toggleClass('sorter_enabled');
        el.data('asc', !ascending);
        el.find('.sorter__name').toggleClass('sorter_enabled');
        el.find(ascending ? '.fa-sort-asc' : '.fa-sort-desc').toggleClass('sorter_enabled');
    }

    serializeData() {
        const sortSettings = settings.getTreeSorting(this.sorterSettingsKey);
        return {
            sorters: AVAILABLE_SORTERS.map(sorter => ({
                name: sorter,
                asc: (sortSettings.sorter === sorter) && sortSettings.ascending,
                desc: (sortSettings.sorter === sorter) && !sortSettings.ascending
            }))
        };
    }
}

export default NodeSorterView;
